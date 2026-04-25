#!/usr/bin/env python3
"""
Backend API Testing Suite for Soumyajit Samal Portfolio
Tests all FastAPI endpoints at the public REACT_APP_BACKEND_URL
"""

import requests
import json
import uuid
from datetime import datetime
import sys
import os

# Backend URL from frontend/.env
BACKEND_URL = "https://academic-archive-3.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.results = []
    
    def add_result(self, test_name, passed, details):
        self.results.append({
            'test': test_name,
            'passed': passed,
            'details': details
        })
        if passed:
            self.passed += 1
        else:
            self.failed += 1
    
    def print_summary(self):
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY: {self.passed} PASSED, {self.failed} FAILED")
        print(f"{'='*60}")
        
        for result in self.results:
            status = "✅ PASS" if result['passed'] else "❌ FAIL"
            print(f"{status}: {result['test']}")
            if result['details']:
                print(f"    Details: {result['details']}")
        
        return self.failed == 0

def test_health_endpoint():
    """Test GET /api/health"""
    print("\n1. Testing Health Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "ok":
                results.add_result("Health endpoint", True, f"Status: {response.status_code}, Response: {data}")
                print("✅ Health endpoint working correctly")
                return True
            else:
                results.add_result("Health endpoint", False, f"Wrong response format: {data}")
                print(f"❌ Health endpoint returned wrong format: {data}")
                return False
        else:
            results.add_result("Health endpoint", False, f"Status: {response.status_code}, Response: {response.text}")
            print(f"❌ Health endpoint returned status {response.status_code}")
            return False
            
    except Exception as e:
        results.add_result("Health endpoint", False, f"Exception: {str(e)}")
        print(f"❌ Health endpoint failed with exception: {e}")
        return False

def test_root_endpoint():
    """Test GET /api/"""
    print("\n2. Testing Root Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            response_text = json.dumps(data).lower()
            if "soumyajit" in response_text:
                results.add_result("Root endpoint", True, f"Status: {response.status_code}, Response: {data}")
                print("✅ Root endpoint working correctly")
                return True
            else:
                results.add_result("Root endpoint", False, f"Response doesn't contain 'Soumyajit': {data}")
                print(f"❌ Root endpoint doesn't contain 'Soumyajit': {data}")
                return False
        else:
            results.add_result("Root endpoint", False, f"Status: {response.status_code}, Response: {response.text}")
            print(f"❌ Root endpoint returned status {response.status_code}")
            return False
            
    except Exception as e:
        results.add_result("Root endpoint", False, f"Exception: {str(e)}")
        print(f"❌ Root endpoint failed with exception: {e}")
        return False

def test_contact_endpoints():
    """Test POST /api/contact and GET /api/contact"""
    print("\n3. Testing Contact Endpoints...")
    
    # Test valid contact submission
    print("3a. Testing valid contact submission...")
    valid_payload = {
        "name": "Test User",
        "email": "test@example.com", 
        "subject": "Hello",
        "message": "This is a test message."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=valid_payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("ok") is True and 
                data.get("id") and 
                data.get("received_at") and
                len(data.get("id", "")) > 10):  # UUID-like string
                
                contact_id = data["id"]
                received_at = data["received_at"]
                results.add_result("Contact POST valid", True, f"Status: {response.status_code}, ID: {contact_id}")
                print("✅ Valid contact submission working")
                
                # Test GET /api/contact to verify the message was stored
                print("3b. Testing contact message retrieval...")
                get_response = requests.get(f"{API_BASE}/contact", timeout=10)
                
                if get_response.status_code == 200:
                    messages = get_response.json()
                    if isinstance(messages, list) and len(messages) > 0:
                        # Find our test message
                        test_message = None
                        for msg in messages:
                            if msg.get("id") == contact_id:
                                test_message = msg
                                break
                        
                        if test_message:
                            if (test_message.get("name") == valid_payload["name"] and
                                test_message.get("email") == valid_payload["email"] and
                                test_message.get("subject") == valid_payload["subject"] and
                                test_message.get("message") == valid_payload["message"] and
                                test_message.get("received_at")):
                                
                                results.add_result("Contact GET", True, f"Message found with correct data")
                                print("✅ Contact message retrieval working")
                            else:
                                results.add_result("Contact GET", False, f"Message data mismatch: {test_message}")
                                print(f"❌ Contact message data mismatch")
                        else:
                            results.add_result("Contact GET", False, f"Test message not found in response")
                            print(f"❌ Test message not found in contact list")
                    else:
                        results.add_result("Contact GET", False, f"Invalid response format: {messages}")
                        print(f"❌ Contact GET returned invalid format")
                else:
                    results.add_result("Contact GET", False, f"Status: {get_response.status_code}")
                    print(f"❌ Contact GET returned status {get_response.status_code}")
                
                # Test limit parameter
                print("3c. Testing contact limit parameter...")
                limit_response = requests.get(f"{API_BASE}/contact?limit=5", timeout=10)
                if limit_response.status_code == 200:
                    limited_messages = limit_response.json()
                    if isinstance(limited_messages, list) and len(limited_messages) <= 5:
                        results.add_result("Contact GET limit", True, f"Limit respected: {len(limited_messages)} messages")
                        print("✅ Contact limit parameter working")
                    else:
                        results.add_result("Contact GET limit", False, f"Limit not respected: {len(limited_messages)} messages")
                        print(f"❌ Contact limit not respected")
                else:
                    results.add_result("Contact GET limit", False, f"Status: {limit_response.status_code}")
                    print(f"❌ Contact GET with limit failed")
                
            else:
                results.add_result("Contact POST valid", False, f"Invalid response format: {data}")
                print(f"❌ Valid contact submission returned invalid format: {data}")
        else:
            results.add_result("Contact POST valid", False, f"Status: {response.status_code}, Response: {response.text}")
            print(f"❌ Valid contact submission returned status {response.status_code}")
            
    except Exception as e:
        results.add_result("Contact POST valid", False, f"Exception: {str(e)}")
        print(f"❌ Valid contact submission failed with exception: {e}")
    
    # Test invalid email
    print("3d. Testing invalid email...")
    invalid_email_payload = {
        "name": "X",
        "email": "not-an-email",
        "message": "hi"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=invalid_email_payload, timeout=10)
        if response.status_code == 422:
            results.add_result("Contact POST invalid email", True, f"Status: {response.status_code}")
            print("✅ Invalid email validation working")
        else:
            results.add_result("Contact POST invalid email", False, f"Status: {response.status_code}, Expected: 422")
            print(f"❌ Invalid email should return 422, got {response.status_code}")
    except Exception as e:
        results.add_result("Contact POST invalid email", False, f"Exception: {str(e)}")
        print(f"❌ Invalid email test failed with exception: {e}")
    
    # Test empty name
    print("3e. Testing empty name...")
    empty_name_payload = {
        "name": "",
        "email": "a@b.co",
        "message": "hi"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=empty_name_payload, timeout=10)
        if response.status_code == 422:
            results.add_result("Contact POST empty name", True, f"Status: {response.status_code}")
            print("✅ Empty name validation working")
        else:
            results.add_result("Contact POST empty name", False, f"Status: {response.status_code}, Expected: 422")
            print(f"❌ Empty name should return 422, got {response.status_code}")
    except Exception as e:
        results.add_result("Contact POST empty name", False, f"Exception: {str(e)}")
        print(f"❌ Empty name test failed with exception: {e}")
    
    # Test missing message
    print("3f. Testing missing message...")
    missing_message_payload = {
        "name": "X",
        "email": "a@b.co"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=missing_message_payload, timeout=10)
        if response.status_code == 422:
            results.add_result("Contact POST missing message", True, f"Status: {response.status_code}")
            print("✅ Missing message validation working")
        else:
            results.add_result("Contact POST missing message", False, f"Status: {response.status_code}, Expected: 422")
            print(f"❌ Missing message should return 422, got {response.status_code}")
    except Exception as e:
        results.add_result("Contact POST missing message", False, f"Exception: {str(e)}")
        print(f"❌ Missing message test failed with exception: {e}")

def test_news_endpoints():
    """Test GET /api/news, POST /api/news, DELETE /api/news/{id}"""
    print("\n4. Testing News Endpoints...")
    
    # Test GET /api/news (should return seeded fallback if empty)
    print("4a. Testing news retrieval...")
    try:
        response = requests.get(f"{API_BASE}/news", timeout=10)
        
        if response.status_code == 200:
            news_items = response.json()
            if isinstance(news_items, list) and len(news_items) >= 1:
                # Check if we have seeded items
                has_seed_items = any(item.get("id", "").startswith("seed-") for item in news_items)
                results.add_result("News GET initial", True, f"Got {len(news_items)} items, has_seed: {has_seed_items}")
                print(f"✅ News GET working, got {len(news_items)} items")
            else:
                results.add_result("News GET initial", False, f"Invalid response: {news_items}")
                print(f"❌ News GET returned invalid format")
        else:
            results.add_result("News GET initial", False, f"Status: {response.status_code}")
            print(f"❌ News GET returned status {response.status_code}")
            
    except Exception as e:
        results.add_result("News GET initial", False, f"Exception: {str(e)}")
        print(f"❌ News GET failed with exception: {e}")
    
    # Test POST /api/news
    print("4b. Testing news creation...")
    news_payload = {
        "date": "Jul 2025",
        "text": "Test news entry"
    }
    
    created_news_id = None
    try:
        response = requests.post(f"{API_BASE}/news", json=news_payload, timeout=10)
        
        if response.status_code == 201:
            data = response.json()
            if (data.get("id") and 
                data.get("date") == news_payload["date"] and
                data.get("text") == news_payload["text"] and
                data.get("created_at") and
                not data.get("id", "").startswith("seed-")):  # Real UUID, not seed
                
                created_news_id = data["id"]
                results.add_result("News POST", True, f"Status: {response.status_code}, ID: {created_news_id}")
                print("✅ News creation working")
                
                # Test GET /api/news again to verify the new item appears first
                print("4c. Testing news retrieval after creation...")
                get_response = requests.get(f"{API_BASE}/news", timeout=10)
                
                if get_response.status_code == 200:
                    updated_news = get_response.json()
                    if (isinstance(updated_news, list) and 
                        len(updated_news) > 0 and
                        updated_news[0].get("id") == created_news_id):
                        
                        results.add_result("News GET after POST", True, f"New item appears first")
                        print("✅ News ordering working (newest first)")
                    else:
                        results.add_result("News GET after POST", False, f"New item not first: {updated_news[0] if updated_news else 'empty'}")
                        print(f"❌ News ordering not working")
                else:
                    results.add_result("News GET after POST", False, f"Status: {get_response.status_code}")
                    print(f"❌ News GET after POST failed")
                
            else:
                results.add_result("News POST", False, f"Invalid response format: {data}")
                print(f"❌ News creation returned invalid format: {data}")
        else:
            results.add_result("News POST", False, f"Status: {response.status_code}, Response: {response.text}")
            print(f"❌ News creation returned status {response.status_code}")
            
    except Exception as e:
        results.add_result("News POST", False, f"Exception: {str(e)}")
        print(f"❌ News creation failed with exception: {e}")
    
    # Test DELETE /api/news/{id}
    if created_news_id:
        print("4d. Testing news deletion...")
        try:
            response = requests.delete(f"{API_BASE}/news/{created_news_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("ok") is True and data.get("deleted") == created_news_id:
                    results.add_result("News DELETE valid", True, f"Status: {response.status_code}")
                    print("✅ News deletion working")
                    
                    # Verify the item is actually deleted
                    print("4e. Testing news retrieval after deletion...")
                    get_response = requests.get(f"{API_BASE}/news", timeout=10)
                    
                    if get_response.status_code == 200:
                        final_news = get_response.json()
                        item_still_exists = any(item.get("id") == created_news_id for item in final_news)
                        
                        if not item_still_exists:
                            results.add_result("News GET after DELETE", True, f"Item properly removed")
                            print("✅ News deletion verification working")
                        else:
                            results.add_result("News GET after DELETE", False, f"Item still exists after deletion")
                            print(f"❌ News item still exists after deletion")
                    else:
                        results.add_result("News GET after DELETE", False, f"Status: {get_response.status_code}")
                        print(f"❌ News GET after DELETE failed")
                        
                else:
                    results.add_result("News DELETE valid", False, f"Invalid response format: {data}")
                    print(f"❌ News deletion returned invalid format: {data}")
            else:
                results.add_result("News DELETE valid", False, f"Status: {response.status_code}")
                print(f"❌ News deletion returned status {response.status_code}")
                
        except Exception as e:
            results.add_result("News DELETE valid", False, f"Exception: {str(e)}")
            print(f"❌ News deletion failed with exception: {e}")
    
    # Test DELETE with non-existent ID
    print("4f. Testing news deletion with non-existent ID...")
    fake_id = str(uuid.uuid4())
    try:
        response = requests.delete(f"{API_BASE}/news/{fake_id}", timeout=10)
        
        if response.status_code == 404:
            results.add_result("News DELETE invalid", True, f"Status: {response.status_code}")
            print("✅ News deletion 404 handling working")
        else:
            results.add_result("News DELETE invalid", False, f"Status: {response.status_code}, Expected: 404")
            print(f"❌ News deletion should return 404 for non-existent ID, got {response.status_code}")
            
    except Exception as e:
        results.add_result("News DELETE invalid", False, f"Exception: {str(e)}")
        print(f"❌ News deletion 404 test failed with exception: {e}")

def test_cors_headers():
    """Test CORS headers"""
    print("\n5. Testing CORS Headers...")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        cors_header = response.headers.get("Access-Control-Allow-Origin")
        if cors_header:
            results.add_result("CORS headers", True, f"Access-Control-Allow-Origin: {cors_header}")
            print(f"✅ CORS headers present: {cors_header}")
        else:
            results.add_result("CORS headers", False, f"No Access-Control-Allow-Origin header found")
            print(f"❌ CORS headers missing")
            
    except Exception as e:
        results.add_result("CORS headers", False, f"Exception: {str(e)}")
        print(f"❌ CORS test failed with exception: {e}")

def main():
    """Run all tests"""
    print(f"Starting Backend API Tests...")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    
    # Run all tests
    test_health_endpoint()
    test_root_endpoint()
    test_contact_endpoints()
    test_news_endpoints()
    test_cors_headers()
    
    # Print summary
    success = results.print_summary()
    
    if success:
        print(f"\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n💥 SOME TESTS FAILED!")
        return 1

if __name__ == "__main__":
    results = TestResults()
    exit_code = main()
    sys.exit(exit_code)