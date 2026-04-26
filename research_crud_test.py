#!/usr/bin/env python3
"""
Research Experience CRUD Endpoint Testing
Tests all /api/research endpoints following the exact test plan provided.
"""

import requests
import json
import sys
from typing import Dict, Any, List

# Base URL from frontend/.env
BASE_URL = "https://academic-archive-3.preview.emergentagent.com/api"

def test_step(step_num: int, description: str, expected_status: int = None):
    """Decorator to print test step information"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f"\n{'='*60}")
            print(f"STEP {step_num}: {description}")
            print('='*60)
            try:
                result = func(*args, **kwargs)
                if expected_status and hasattr(result, 'status_code'):
                    if result.status_code == expected_status:
                        print(f"✅ PASS: HTTP {result.status_code} (expected {expected_status})")
                    else:
                        print(f"❌ FAIL: HTTP {result.status_code} (expected {expected_status})")
                return result
            except Exception as e:
                print(f"❌ ERROR: {str(e)}")
                raise
        return wrapper
    return decorator

class ResearchCRUDTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.created_id = None
        self.session = requests.Session()
        self.test_results = []
        
    def add_result(self, step: str, passed: bool, details: str):
        """Add test result"""
        self.test_results.append({
            'step': step,
            'passed': passed,
            'details': details
        })
        
    def run_all_tests(self):
        """Execute all test steps in order"""
        print(f"🚀 Starting Research Experience CRUD Testing")
        print(f"Base URL: {self.base_url}")
        
        try:
            # Test Plan Execution
            self.test_1_get_empty_collection()
            self.test_2_get_seeded_item()
            self.test_3_get_nonexistent_item()
            self.test_4_post_new_item()
            self.test_5_get_with_real_items()
            self.test_6_patch_update_links()
            self.test_7_patch_empty_body()
            self.test_8_patch_nonexistent()
            self.test_9_post_invalid_links_missing_url()
            self.test_10_post_invalid_links_long_label()
            self.test_11_delete_item()
            self.test_12_delete_again()
            self.test_13_verify_cleanup()
            
            self.print_summary()
            
        except Exception as e:
            print(f"\n❌ TESTING FAILED: {str(e)}")
            sys.exit(1)
    
    def print_summary(self):
        """Print test summary"""
        passed = sum(1 for r in self.test_results if r['passed'])
        failed = len(self.test_results) - passed
        
        print(f"\n{'='*60}")
        print(f"🎯 RESEARCH CRUD TEST SUMMARY: {passed} PASSED, {failed} FAILED")
        print('='*60)
        
        for result in self.test_results:
            status = "✅ PASS" if result['passed'] else "❌ FAIL"
            print(f"{status}: {result['step']}")
            if not result['passed']:
                print(f"    Details: {result['details']}")
        
        if failed == 0:
            print(f"\n🎉 ALL RESEARCH CRUD TESTS PASSED!")
        else:
            print(f"\n💥 {failed} RESEARCH CRUD TESTS FAILED!")
    
    @test_step(1, "GET /api/research — empty collection should return 7 seeded items", 200)
    def test_1_get_empty_collection(self):
        """Test GET /api/research on empty collection"""
        response = self.session.get(f"{self.base_url}/research")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            self.add_result("Step 1: GET empty collection", False, f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return response
            
        data = response.json()
        print(f"Response length: {len(data)}")
        
        # Verify length == 7
        if len(data) != 7:
            self.add_result("Step 1: GET empty collection", False, f"Expected 7 items, got {len(data)}")
            return response
        
        # Verify structure of first item
        if data:
            first_item = data[0]
            required_fields = ['id', 'title', 'summary', 'tags', 'links', 'order', 'created_at']
            
            print(f"First item fields: {list(first_item.keys())}")
            
            missing_fields = [field for field in required_fields if field not in first_item]
            if missing_fields:
                self.add_result("Step 1: GET empty collection", False, f"Missing fields: {missing_fields}")
                return response
            
            # Verify IDs start with "seed-r"
            if not first_item['id'].startswith('seed-r'):
                self.add_result("Step 1: GET empty collection", False, f"ID format incorrect: {first_item['id']}")
                return response
            
            # Verify first item (seed-r1) has specific links
            if first_item['id'] == 'seed-r1':
                links = first_item.get('links', [])
                print(f"seed-r1 links: {links}")
                
                if len(links) != 2:
                    self.add_result("Step 1: GET empty collection", False, f"seed-r1 should have 2 links, got {len(links)}")
                    return response
                
                # Check for Paper link with acs.nanolett
                paper_link = next((l for l in links if l.get('label') == 'Paper'), None)
                if not paper_link or 'acs.nanolett' not in paper_link.get('url', ''):
                    self.add_result("Step 1: GET empty collection", False, "Paper link with acs.nanolett not found")
                    return response
                
                # Check for Group link
                group_link = next((l for l in links if l.get('label') == 'Group'), None)
                if not group_link:
                    self.add_result("Step 1: GET empty collection", False, "Group link not found")
                    return response
        
        self.add_result("Step 1: GET empty collection", True, "All validations passed")
        print("✅ All validations passed")
        return response
    
    @test_step(2, "GET /api/research/seed-r1 — should return seeded item with HTTP 200", 200)
    def test_2_get_seeded_item(self):
        """Test GET /api/research/seed-r1"""
        response = self.session.get(f"{self.base_url}/research/seed-r1")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Item ID: {data.get('id')}")
            print(f"Item title: {data.get('title')}")
            if data.get('id') == 'seed-r1':
                self.add_result("Step 2: GET seeded item", True, "Correct seeded item returned")
                print("✅ Correct seeded item returned")
            else:
                self.add_result("Step 2: GET seeded item", False, f"Wrong item returned: {data.get('id')}")
        else:
            self.add_result("Step 2: GET seeded item", False, f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(3, "GET /api/research/this-id-does-not-exist — should return 404", 404)
    def test_3_get_nonexistent_item(self):
        """Test GET /api/research with non-existent ID"""
        response = self.session.get(f"{self.base_url}/research/this-id-does-not-exist")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 404:
            self.add_result("Step 3: GET non-existent", True, "Correctly returned 404")
            print("✅ Correctly returned 404 for non-existent item")
        else:
            self.add_result("Step 3: GET non-existent", False, f"Expected 404, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(4, "POST /api/research — create new item", 201)
    def test_4_post_new_item(self):
        """Test POST /api/research with valid payload"""
        payload = {
            "title": "Test Project: Probing Topological Edges",
            "role": "Side Project",
            "advisor": "Prof. Test",
            "institution": "Test Lab",
            "period": "2025",
            "summary": "A brief summary of a test research project for endpoint verification.",
            "tags": ["topology", "graphene"],
            "links": [
                {"label": "Paper", "url": "https://example.com/paper"},
                {"label": "Code", "url": "https://github.com/example/repo"}
            ]
        }
        
        response = self.session.post(f"{self.base_url}/research", json=payload)
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"Created item ID: {data.get('id')}")
            
            # Save ID for later tests
            self.created_id = data.get('id')
            
            # Verify response structure
            errors = []
            
            if not data.get('id') or data.get('id').startswith('seed-'):
                errors.append(f"Invalid ID: {data.get('id')}")
            
            if 'order' not in data:
                errors.append("Order field missing")
            
            if 'created_at' not in data:
                errors.append("created_at missing")
            
            if len(data.get('links', [])) != 2:
                errors.append(f"Links not preserved correctly: {len(data.get('links', []))}")
            
            if errors:
                self.add_result("Step 4: POST new item", False, "; ".join(errors))
            else:
                self.add_result("Step 4: POST new item", True, "Item created successfully with correct structure")
                print("✅ Item created successfully")
            
            print(f"Full response: {json.dumps(data, indent=2)}")
        else:
            self.add_result("Step 4: POST new item", False, f"Expected 201, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(5, "GET /api/research — should now return real items from DB", 200)
    def test_5_get_with_real_items(self):
        """Test GET /api/research after creating real item"""
        response = self.session.get(f"{self.base_url}/research")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of items: {len(data)}")
            
            # Should NOT be seeded items anymore
            has_seeded = any(item.get('id', '').startswith('seed-') for item in data)
            if has_seeded:
                self.add_result("Step 5: GET with real items", False, "Still returning seeded items when real items exist")
                return response
            
            # Check if our created item is present
            if self.created_id:
                created_item = next((item for item in data if item.get('id') == self.created_id), None)
                if created_item:
                    self.add_result("Step 5: GET with real items", True, "Created item found in list, no seeded fallback")
                    print(f"✅ Created item found: {created_item.get('title')}")
                else:
                    self.add_result("Step 5: GET with real items", False, "Created item not found in list")
            else:
                self.add_result("Step 5: GET with real items", False, "No created ID available")
        else:
            self.add_result("Step 5: GET with real items", False, f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(6, "PATCH /api/research/{id} — update links", 200)
    def test_6_patch_update_links(self):
        """Test PATCH /api/research/{id} with links update"""
        if not self.created_id:
            self.add_result("Step 6: PATCH update links", False, "No created ID available")
            return None
        
        patch_payload = {
            "links": [{"label": "Updated Paper", "url": "https://example.com/v2"}]
        }
        
        response = self.session.patch(f"{self.base_url}/research/{self.created_id}", json=patch_payload)
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check links updated
            links = data.get('links', [])
            errors = []
            
            if len(links) != 1 or links[0].get('label') != 'Updated Paper':
                errors.append(f"Links not updated correctly: {links}")
            
            # Check updated_at is present and non-null
            if not data.get('updated_at'):
                errors.append("updated_at is missing or null")
            
            if errors:
                self.add_result("Step 6: PATCH update links", False, "; ".join(errors))
            else:
                self.add_result("Step 6: PATCH update links", True, "Links updated correctly with updated_at timestamp")
                print("✅ Links updated successfully")
            
            print(f"Updated item: {json.dumps(data, indent=2)}")
        else:
            self.add_result("Step 6: PATCH update links", False, f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(7, "PATCH /api/research/{id} with empty body — should return 400", 400)
    def test_7_patch_empty_body(self):
        """Test PATCH /api/research/{id} with empty body"""
        if not self.created_id:
            self.add_result("Step 7: PATCH empty body", False, "No created ID available")
            return None
        
        response = self.session.patch(f"{self.base_url}/research/{self.created_id}", json={})
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 400:
            self.add_result("Step 7: PATCH empty body", True, "Correctly returned 400 for empty body")
            print("✅ Correctly returned 400 for empty body")
            print(f"Error message: {response.text}")
        else:
            self.add_result("Step 7: PATCH empty body", False, f"Expected 400, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(8, "PATCH /api/research/non-existent-id — should return 404", 404)
    def test_8_patch_nonexistent(self):
        """Test PATCH /api/research with non-existent ID"""
        patch_payload = {"summary": "x"}
        
        response = self.session.patch(f"{self.base_url}/research/non-existent-id", json=patch_payload)
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 404:
            self.add_result("Step 8: PATCH non-existent", True, "Correctly returned 404 for non-existent item")
            print("✅ Correctly returned 404 for non-existent item")
        else:
            self.add_result("Step 8: PATCH non-existent", False, f"Expected 404, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(9, "POST /api/research with invalid links (missing url) — should return 422", 422)
    def test_9_post_invalid_links_missing_url(self):
        """Test POST /api/research with invalid links (missing url)"""
        payload = {
            "title": "x",
            "summary": "y",
            "links": [{"label": "OK"}]  # Missing url
        }
        
        response = self.session.post(f"{self.base_url}/research", json=payload)
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 422:
            self.add_result("Step 9: POST invalid links (missing url)", True, "Correctly returned 422 for invalid links")
            print("✅ Correctly returned 422 for invalid links")
            print(f"Validation error: {response.text}")
        else:
            self.add_result("Step 9: POST invalid links (missing url)", False, f"Expected 422, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(10, "POST /api/research with link label too long (>40 chars) — should return 422", 422)
    def test_10_post_invalid_links_long_label(self):
        """Test POST /api/research with link label too long"""
        long_label = "A" * 60  # 60 'A' characters
        payload = {
            "title": "x",
            "summary": "y",
            "links": [{"label": long_label, "url": "https://x"}]
        }
        
        response = self.session.post(f"{self.base_url}/research", json=payload)
        
        print(f"Status: {response.status_code}")
        print(f"Label length: {len(long_label)} chars")
        
        if response.status_code == 422:
            self.add_result("Step 10: POST invalid links (long label)", True, "Correctly returned 422 for label too long")
            print("✅ Correctly returned 422 for label too long")
            print(f"Validation error: {response.text}")
        else:
            self.add_result("Step 10: POST invalid links (long label)", False, f"Expected 422, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(11, "DELETE /api/research/{id} — should return 200", 200)
    def test_11_delete_item(self):
        """Test DELETE /api/research/{id}"""
        if not self.created_id:
            self.add_result("Step 11: DELETE item", False, "No created ID available")
            return None
        
        response = self.session.delete(f"{self.base_url}/research/{self.created_id}")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('ok') and data.get('deleted') == self.created_id:
                self.add_result("Step 11: DELETE item", True, "Item deleted successfully")
                print("✅ Item deleted successfully")
                print(f"Delete response: {data}")
            else:
                self.add_result("Step 11: DELETE item", False, f"Unexpected delete response: {data}")
        else:
            self.add_result("Step 11: DELETE item", False, f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(12, "DELETE /api/research/{id} again — should return 404", 404)
    def test_12_delete_again(self):
        """Test DELETE /api/research/{id} again (should be 404)"""
        if not self.created_id:
            self.add_result("Step 12: DELETE again", False, "No created ID available")
            return None
        
        response = self.session.delete(f"{self.base_url}/research/{self.created_id}")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 404:
            self.add_result("Step 12: DELETE again", True, "Correctly returned 404 for already deleted item")
            print("✅ Correctly returned 404 for already deleted item")
        else:
            self.add_result("Step 12: DELETE again", False, f"Expected 404, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response
    
    @test_step(13, "GET /api/research — verify test item is gone", 200)
    def test_13_verify_cleanup(self):
        """Test GET /api/research to verify cleanup"""
        response = self.session.get(f"{self.base_url}/research")
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of items after cleanup: {len(data)}")
            
            # Check if our created item is gone
            if self.created_id:
                created_item = next((item for item in data if item.get('id') == self.created_id), None)
                if not created_item:
                    self.add_result("Step 13: Verify cleanup", True, "Test item successfully removed")
                    print("✅ Test item successfully removed")
                else:
                    self.add_result("Step 13: Verify cleanup", False, "Test item still present after deletion")
            else:
                self.add_result("Step 13: Verify cleanup", False, "No created ID to verify")
            
            # Check if seeded fallback reappeared (acceptable either way)
            has_seeded = any(item.get('id', '').startswith('seed-') for item in data)
            if has_seeded:
                print("ℹ️  Seeded fallback reappeared (collection is empty)")
            else:
                print("ℹ️  Real items still present (collection not empty)")
        else:
            self.add_result("Step 13: Verify cleanup", False, f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
        
        return response

def main():
    """Main test execution"""
    tester = ResearchCRUDTester()
    tester.run_all_tests()

if __name__ == "__main__":
    main()