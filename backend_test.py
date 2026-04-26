#!/usr/bin/env python3
"""
Backend Authentication & Admin Protection Testing
Tests the new auth layer on FastAPI backend at public REACT_APP_BACKEND_URL.
"""

import requests
import json
import uuid
import subprocess
import os
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

# Configuration
BACKEND_URL = "https://academic-archive-3.preview.emergentagent.com/api"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"
ADMIN_EMAILS = ["soumyajits2000@gmail.com", "soumyajitsomu@gmail.com"]

class AuthTester:
    def __init__(self):
        self.session = requests.Session()
        self.admin_token = None
        self.user_token = None
        self.admin_user_id = None
        self.user_user_id = None
        self.test_research_id = None
        self.test_news_id = None
        self.results = []
        
    def log_result(self, test_name: str, expected: str, actual: str, passed: bool, details: str = ""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = {
            "test": test_name,
            "expected": expected,
            "actual": actual,
            "status": status,
            "details": details
        }
        self.results.append(result)
        print(f"{status}: {test_name}")
        if details:
            print(f"    Details: {details}")
        if not passed:
            print(f"    Expected: {expected}, Got: {actual}")
        print()

    def seed_users_and_sessions(self):
        """Seed test users and sessions via mongosh"""
        print("🌱 Seeding test users and sessions...")
        
        # Generate random IDs
        admin_user_id = f"user_admin_test_{uuid.uuid4().hex[:8]}"
        user_user_id = f"user_regular_test_{uuid.uuid4().hex[:8]}"
        admin_token = f"admintok_{uuid.uuid4().hex[:8]}"
        user_token = f"usertok_{uuid.uuid4().hex[:8]}"
        
        # MongoDB commands to seed data
        mongo_commands = f'''
        const adminUserId = "{admin_user_id}";
        const userUserId = "{user_user_id}";
        const adminToken = "{admin_token}";
        const userToken = "{user_token}";
        const expiresAt = new Date(Date.now() + 7*24*3600*1000);
        
        db.users.insertOne({{
            user_id: adminUserId,
            email: "{ADMIN_EMAILS[0]}",
            name: "Test Admin User",
            picture: "https://example.com/admin.jpg",
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString()
        }});
        
        db.users.insertOne({{
            user_id: userUserId,
            email: "random@example.com",
            name: "Test Regular User",
            picture: "https://example.com/user.jpg",
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString()
        }});
        
        db.user_sessions.insertOne({{
            session_token: adminToken,
            user_id: adminUserId,
            created_at: new Date(),
            expires_at: expiresAt
        }});
        
        db.user_sessions.insertOne({{
            session_token: userToken,
            user_id: userUserId,
            created_at: new Date(),
            expires_at: expiresAt
        }});
        
        print("Admin token: " + adminToken);
        print("User token: " + userToken);
        print("Sessions count: " + db.user_sessions.countDocuments({{}}));
        '''
        
        try:
            # Execute mongosh commands
            result = subprocess.run(
                ["mongosh", f"{MONGO_URL}/{DB_NAME}", "--eval", mongo_commands],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                print("✅ Successfully seeded test users and sessions")
                print(result.stdout)
                self.admin_token = admin_token
                self.user_token = user_token
                self.admin_user_id = admin_user_id
                self.user_user_id = user_user_id
                return True
            else:
                print(f"❌ Failed to seed data: {result.stderr}")
                return False
                
        except Exception as e:
            print(f"❌ Error seeding data: {e}")
            return False

    def cleanup_test_data(self):
        """Clean up test data from database"""
        print("🧹 Cleaning up test data...")
        
        mongo_commands = f'''
        db.users.deleteMany({{email: {{$in: ["random@example.com"]}}}});
        db.user_sessions.deleteMany({{session_token: {{$regex: /admintok_|usertok_/}}}});
        db.research.deleteMany({{title: "Auth test"}});
        db.news.deleteMany({{text: "test"}});
        db.contact_messages.deleteMany({{name: "Auth Test User"}});
        print("Cleanup completed");
        '''
        
        try:
            result = subprocess.run(
                ["mongosh", f"{MONGO_URL}/{DB_NAME}", "--eval", mongo_commands],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                print("✅ Cleanup completed successfully")
            else:
                print(f"⚠️ Cleanup warning: {result.stderr}")
                
        except Exception as e:
            print(f"⚠️ Cleanup error: {e}")

    def test_auth_endpoints(self):
        """Test authentication endpoints (A1-A7)"""
        print("🔐 Testing Authentication Endpoints...")
        
        # A1: GET /api/auth/me with no auth → expect 401
        response = self.session.get(f"{BACKEND_URL}/auth/me")
        self.log_result(
            "A1: GET /auth/me (no auth)",
            "401",
            str(response.status_code),
            response.status_code == 401,
            f"Response: {response.text[:100]}"
        )
        
        # A2: GET /api/auth/me with bogus Bearer token → expect 401
        headers = {"Authorization": "Bearer notarealtoken"}
        response = self.session.get(f"{BACKEND_URL}/auth/me", headers=headers)
        self.log_result(
            "A2: GET /auth/me (bogus token)",
            "401",
            str(response.status_code),
            response.status_code == 401,
            f"Response: {response.text[:100]}"
        )
        
        # A3: POST /api/auth/session with invalid session_id → expect 502 or 401
        invalid_payload = {"session_id": "definitely-invalid-fake-id-12345"}
        response = self.session.post(f"{BACKEND_URL}/auth/session", json=invalid_payload)
        expected_codes = [401, 502]
        self.log_result(
            "A3: POST /auth/session (invalid session_id)",
            "401 or 502",
            str(response.status_code),
            response.status_code in expected_codes,
            f"Response: {response.text[:100]}"
        )
        
        # A4: POST /api/auth/session with empty body → expect 422
        response = self.session.post(f"{BACKEND_URL}/auth/session", json={})
        self.log_result(
            "A4: POST /auth/session (empty body)",
            "422",
            str(response.status_code),
            response.status_code == 422,
            f"Response: {response.text[:100]}"
        )
        
        # A5: GET /api/auth/me with admin Bearer token → expect 200 with is_admin: true
        if self.admin_token:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.get(f"{BACKEND_URL}/auth/me", headers=headers)
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    is_admin = data.get("is_admin", False)
                    email = data.get("email", "")
                    has_required_fields = all(k in data for k in ["user_id", "email", "name", "is_admin"])
                    
                    self.log_result(
                        "A5: GET /auth/me (admin token)",
                        "200 with is_admin: true",
                        f"200 with is_admin: {is_admin}",
                        response.status_code == 200 and is_admin and has_required_fields,
                        f"Email: {email}, Fields: {list(data.keys())}"
                    )
                except json.JSONDecodeError:
                    self.log_result(
                        "A5: GET /auth/me (admin token)",
                        "200 with valid JSON",
                        f"200 with invalid JSON",
                        False,
                        f"Response: {response.text[:100]}"
                    )
            else:
                self.log_result(
                    "A5: GET /auth/me (admin token)",
                    "200",
                    str(response.status_code),
                    False,
                    f"Response: {response.text[:100]}"
                )
        
        # A6: GET /api/auth/me with regular user token → expect 200 with is_admin: false
        if self.user_token:
            headers = {"Authorization": f"Bearer {self.user_token}"}
            response = self.session.get(f"{BACKEND_URL}/auth/me", headers=headers)
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    is_admin = data.get("is_admin", True)  # Default to True to catch failures
                    email = data.get("email", "")
                    
                    self.log_result(
                        "A6: GET /auth/me (user token)",
                        "200 with is_admin: false",
                        f"200 with is_admin: {is_admin}",
                        response.status_code == 200 and not is_admin,
                        f"Email: {email}"
                    )
                except json.JSONDecodeError:
                    self.log_result(
                        "A6: GET /auth/me (user token)",
                        "200 with valid JSON",
                        f"200 with invalid JSON",
                        False,
                        f"Response: {response.text[:100]}"
                    )
            else:
                self.log_result(
                    "A6: GET /auth/me (user token)",
                    "200",
                    str(response.status_code),
                    False,
                    f"Response: {response.text[:100]}"
                )
        
        # A7: POST /api/auth/logout with admin token → expect 200, then GET /auth/me → expect 401
        if self.admin_token:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.post(f"{BACKEND_URL}/auth/logout", headers=headers)
            
            logout_success = response.status_code == 200
            if logout_success:
                try:
                    data = response.json()
                    logout_success = data.get("ok", False)
                except:
                    logout_success = False
            
            # Test that session is deleted
            response2 = self.session.get(f"{BACKEND_URL}/auth/me", headers=headers)
            session_deleted = response2.status_code == 401
            
            self.log_result(
                "A7: POST /auth/logout + session deletion",
                "200 {ok:true}, then 401",
                f"{response.status_code}, then {response2.status_code}",
                logout_success and session_deleted,
                f"Logout response: {response.text[:50]}, Auth check: {response2.text[:50]}"
            )
            
            # Re-seed admin session for subsequent tests
            self.seed_users_and_sessions()

    def test_admin_protected_endpoints(self):
        """Test admin-protected endpoints (B1-B17)"""
        print("🛡️ Testing Admin-Protected Endpoints...")
        
        # B1: GET /api/research without auth → expect 200 (still public)
        response = self.session.get(f"{BACKEND_URL}/research")
        self.log_result(
            "B1: GET /research (no auth)",
            "200",
            str(response.status_code),
            response.status_code == 200,
            f"Response length: {len(response.text)}"
        )
        
        # B2: POST /api/research without auth → expect 401
        payload = {"title": "Auth test", "summary": "x"}
        response = self.session.post(f"{BACKEND_URL}/research", json=payload)
        self.log_result(
            "B2: POST /research (no auth)",
            "401",
            str(response.status_code),
            response.status_code == 401,
            f"Response: {response.text[:100]}"
        )
        
        # B3: POST /api/research with non-admin Bearer → expect 403
        if self.user_token:
            headers = {"Authorization": f"Bearer {self.user_token}"}
            response = self.session.post(f"{BACKEND_URL}/research", json=payload, headers=headers)
            self.log_result(
                "B3: POST /research (non-admin)",
                "403",
                str(response.status_code),
                response.status_code == 403,
                f"Response: {response.text[:100]}"
            )
        
        # B4: POST /api/research with admin Bearer → expect 201
        if self.admin_token:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.post(f"{BACKEND_URL}/research", json=payload, headers=headers)
            
            if response.status_code == 201:
                try:
                    data = response.json()
                    self.test_research_id = data.get("id")
                    self.log_result(
                        "B4: POST /research (admin)",
                        "201",
                        str(response.status_code),
                        True,
                        f"Created research ID: {self.test_research_id}"
                    )
                except:
                    self.log_result(
                        "B4: POST /research (admin)",
                        "201 with valid JSON",
                        f"201 with invalid JSON",
                        False,
                        f"Response: {response.text[:100]}"
                    )
            else:
                self.log_result(
                    "B4: POST /research (admin)",
                    "201",
                    str(response.status_code),
                    False,
                    f"Response: {response.text[:100]}"
                )
        
        # B5: PATCH /api/research/{id} with admin Bearer → expect 200
        if self.admin_token and self.test_research_id:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            patch_payload = {"summary": "updated"}
            response = self.session.patch(f"{BACKEND_URL}/research/{self.test_research_id}", 
                                        json=patch_payload, headers=headers)
            self.log_result(
                "B5: PATCH /research/{id} (admin)",
                "200",
                str(response.status_code),
                response.status_code == 200,
                f"Response: {response.text[:100]}"
            )
        
        # B6: PATCH /api/research/{id} without auth → expect 401
        if self.test_research_id:
            patch_payload = {"summary": "unauthorized update"}
            response = self.session.patch(f"{BACKEND_URL}/research/{self.test_research_id}", 
                                        json=patch_payload)
            self.log_result(
                "B6: PATCH /research/{id} (no auth)",
                "401",
                str(response.status_code),
                response.status_code == 401,
                f"Response: {response.text[:100]}"
            )
        
        # B7: PATCH /api/research/{id} with non-admin Bearer → expect 403
        if self.user_token and self.test_research_id:
            headers = {"Authorization": f"Bearer {self.user_token}"}
            patch_payload = {"summary": "non-admin update"}
            response = self.session.patch(f"{BACKEND_URL}/research/{self.test_research_id}", 
                                        json=patch_payload, headers=headers)
            self.log_result(
                "B7: PATCH /research/{id} (non-admin)",
                "403",
                str(response.status_code),
                response.status_code == 403,
                f"Response: {response.text[:100]}"
            )
        
        # B8: DELETE /api/research/{id} without auth → expect 401
        if self.test_research_id:
            response = self.session.delete(f"{BACKEND_URL}/research/{self.test_research_id}")
            self.log_result(
                "B8: DELETE /research/{id} (no auth)",
                "401",
                str(response.status_code),
                response.status_code == 401,
                f"Response: {response.text[:100]}"
            )
        
        # B9: DELETE /api/research/{id} with non-admin Bearer → expect 403
        if self.user_token and self.test_research_id:
            headers = {"Authorization": f"Bearer {self.user_token}"}
            response = self.session.delete(f"{BACKEND_URL}/research/{self.test_research_id}", 
                                         headers=headers)
            self.log_result(
                "B9: DELETE /research/{id} (non-admin)",
                "403",
                str(response.status_code),
                response.status_code == 403,
                f"Response: {response.text[:100]}"
            )
        
        # B10: DELETE /api/research/{id} with admin Bearer → expect 200
        if self.admin_token and self.test_research_id:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.delete(f"{BACKEND_URL}/research/{self.test_research_id}", 
                                         headers=headers)
            self.log_result(
                "B10: DELETE /research/{id} (admin)",
                "200",
                str(response.status_code),
                response.status_code == 200,
                f"Response: {response.text[:100]}"
            )
        
        # B11: GET /api/news without auth → expect 200 (still public)
        response = self.session.get(f"{BACKEND_URL}/news")
        self.log_result(
            "B11: GET /news (no auth)",
            "200",
            str(response.status_code),
            response.status_code == 200,
            f"Response length: {len(response.text)}"
        )
        
        # B12: POST /api/news without auth → expect 401
        news_payload = {"date": "Aug 2025", "text": "test"}
        response = self.session.post(f"{BACKEND_URL}/news", json=news_payload)
        self.log_result(
            "B12: POST /news (no auth)",
            "401",
            str(response.status_code),
            response.status_code == 401,
            f"Response: {response.text[:100]}"
        )
        
        # B13: POST /api/news with admin Bearer → expect 201
        if self.admin_token:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.post(f"{BACKEND_URL}/news", json=news_payload, headers=headers)
            
            if response.status_code == 201:
                try:
                    data = response.json()
                    self.test_news_id = data.get("id")
                    self.log_result(
                        "B13: POST /news (admin)",
                        "201",
                        str(response.status_code),
                        True,
                        f"Created news ID: {self.test_news_id}"
                    )
                except:
                    self.log_result(
                        "B13: POST /news (admin)",
                        "201 with valid JSON",
                        f"201 with invalid JSON",
                        False,
                        f"Response: {response.text[:100]}"
                    )
            else:
                self.log_result(
                    "B13: POST /news (admin)",
                    "201",
                    str(response.status_code),
                    False,
                    f"Response: {response.text[:100]}"
                )
        
        # B14: DELETE /api/news/{id} without auth → expect 401, with admin Bearer → expect 200
        if self.test_news_id:
            # Without auth
            response = self.session.delete(f"{BACKEND_URL}/news/{self.test_news_id}")
            no_auth_result = response.status_code == 401
            
            # With admin auth
            if self.admin_token:
                headers = {"Authorization": f"Bearer {self.admin_token}"}
                response2 = self.session.delete(f"{BACKEND_URL}/news/{self.test_news_id}", 
                                              headers=headers)
                admin_result = response2.status_code == 200
                
                self.log_result(
                    "B14: DELETE /news/{id} (no auth + admin)",
                    "401, then 200",
                    f"{response.status_code}, then {response2.status_code}",
                    no_auth_result and admin_result,
                    f"No auth: {response.text[:50]}, Admin: {response2.text[:50]}"
                )
        
        # B15: POST /api/contact without auth → expect 200 (still public)
        contact_payload = {
            "name": "Auth Test User",
            "email": "test@example.com",
            "message": "Testing contact form"
        }
        response = self.session.post(f"{BACKEND_URL}/contact", json=contact_payload)
        self.log_result(
            "B15: POST /contact (no auth)",
            "200",
            str(response.status_code),
            response.status_code == 200,
            f"Response: {response.text[:100]}"
        )
        
        # B16: GET /api/contact without auth → expect 401 (now admin-only)
        response = self.session.get(f"{BACKEND_URL}/contact")
        self.log_result(
            "B16: GET /contact (no auth)",
            "401",
            str(response.status_code),
            response.status_code == 401,
            f"Response: {response.text[:100]}"
        )
        
        # B17: GET /api/contact with admin Bearer → expect 200 with array
        if self.admin_token:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.get(f"{BACKEND_URL}/contact", headers=headers)
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    is_array = isinstance(data, list)
                    self.log_result(
                        "B17: GET /contact (admin)",
                        "200 with array",
                        f"200 with {'array' if is_array else 'non-array'}",
                        response.status_code == 200 and is_array,
                        f"Array length: {len(data) if is_array else 'N/A'}"
                    )
                except:
                    self.log_result(
                        "B17: GET /contact (admin)",
                        "200 with valid JSON array",
                        f"200 with invalid JSON",
                        False,
                        f"Response: {response.text[:100]}"
                    )
            else:
                self.log_result(
                    "B17: GET /contact (admin)",
                    "200",
                    str(response.status_code),
                    False,
                    f"Response: {response.text[:100]}"
                )

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*80)
        print("🎯 AUTH & ADMIN PROTECTION TEST SUMMARY")
        print("="*80)
        
        passed = sum(1 for r in self.results if "✅ PASS" in r["status"])
        failed = sum(1 for r in self.results if "❌ FAIL" in r["status"])
        total = len(self.results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Success Rate: {(passed/total*100):.1f}%" if total > 0 else "0%")
        
        if failed > 0:
            print(f"\n❌ FAILED TESTS ({failed}):")
            for result in self.results:
                if "❌ FAIL" in result["status"]:
                    print(f"  • {result['test']}")
                    print(f"    Expected: {result['expected']}")
                    print(f"    Actual: {result['actual']}")
                    if result['details']:
                        print(f"    Details: {result['details']}")
        
        print(f"\n✅ PASSED TESTS ({passed}):")
        for result in self.results:
            if "✅ PASS" in result["status"]:
                print(f"  • {result['test']}")
        
        print("\n" + "="*80)

    def run_all_tests(self):
        """Run all authentication and admin protection tests"""
        print("🚀 Starting Authentication & Admin Protection Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Database: {DB_NAME}")
        print(f"Admin Emails: {ADMIN_EMAILS}")
        print("-" * 80)
        
        # Seed test data
        if not self.seed_users_and_sessions():
            print("❌ Failed to seed test data. Aborting tests.")
            return False
        
        try:
            # Run auth endpoint tests
            self.test_auth_endpoints()
            
            # Run admin protection tests
            self.test_admin_protected_endpoints()
            
            # Print summary
            self.print_summary()
            
            return True
            
        finally:
            # Always cleanup
            self.cleanup_test_data()

if __name__ == "__main__":
    tester = AuthTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)