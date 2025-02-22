import unittest
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_categorize_endpoint(self):
        test_data = [
            {"title": "Google", "url": "https://www.google.com"},
            {"title": "Facebook", "url": "https://www.facebook.com"},
            {"title": "YouTube", "url": "https://www.youtube.com"}
        ]
        response = self.app.post('/categorize', json=test_data)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, dict)

if __name__ == '__main__':
    unittest.main()
