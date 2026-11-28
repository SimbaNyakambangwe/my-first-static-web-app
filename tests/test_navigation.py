import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1] / "src"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = set()
        self.links = []
        self.navigation = []
        self.fields = []
        self.in_navigation = False
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if "id" in attributes:
            self.ids.add(attributes["id"])
        if tag == "nav":
            self.in_navigation = attributes.get("aria-label") == "Wedding navigation"
        if tag in ("input", "textarea", "select"):
            self.fields.append(attributes)
        if tag == "a":
            self.links.append(attributes["href"])
            if self.in_navigation:
                self.navigation.append(attributes)

    def handle_endtag(self, tag):
        if tag == "nav":
            self.in_navigation = False


class NavigationTests(unittest.TestCase):
    def test_travel_form_collects_arrivals_without_accommodation(self):
        page = Page(ROOT / "travel-plans.html")
        fields = {field["name"]: field for field in page.fields
                  if field.get("name") not in ("form-name", "bot-field")}
        self.assertEqual(set(fields), {"name", "plus-ones", "arrival-date"})
        self.assertIn("required", fields["name"])
        self.assertNotIn("required", fields["plus-ones"])
        self.assertNotIn("required", fields["arrival-date"])

    def test_menu_opens_pages_and_marks_the_current_page(self):
        pages = {path.name: Page(path) for path in ROOT.glob("*.html")}
        home_menu = [link["href"] for link in pages["index.html"].navigation]
        self.assertGreater(len(home_menu), 1)
        for filename, page in pages.items():
            if not page.navigation:
                continue
            with self.subTest(page=filename):
                self.assertEqual([link["href"] for link in page.navigation], home_menu)
                current = [link["href"] for link in page.navigation
                           if link.get("aria-current") == "page"]
                self.assertEqual(current, [filename])
                for href in home_menu:
                    destination = urlsplit(href)
                    self.assertFalse(destination.fragment)
                    self.assertIn(destination.path, pages)

    def test_cross_page_links_and_skip_links_resolve(self):
        pages = {path.name: Page(path) for path in ROOT.glob("*.html")}
        for filename, page in pages.items():
            for href in page.links:
                destination = urlsplit(href)
                if destination.scheme or destination.netloc:
                    continue
                with self.subTest(page=filename, link=href):
                    target = unquote(destination.path) or filename
                    self.assertTrue((ROOT / target).is_file())
                    if destination.fragment:
                        self.assertIn(destination.fragment, pages[target].ids)


if __name__ == "__main__":
    unittest.main()
