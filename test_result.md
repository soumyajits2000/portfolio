#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build an elegant, formal, minimalist research portfolio for Soumyajit Samal (incoming PhD candidate
  at LMU Munich, working on 2D nanoelectronics). Content extracted from soumyajitsamal.in. Frontend
  built with paper/journal aesthetic (Crimson Pro + Inter, cream background, burgundy accent).
  Backend now needed to (a) accept contact-form submissions, and (b) serve dynamic news items.

backend:
  - task: "Health endpoint GET /api/health"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Simple liveness probe returning {status: ok}."
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Health endpoint returns {status: ok} with HTTP 200. Root endpoint returns JSON with 'Soumyajit'. All validation working correctly."

  - task: "Contact form: POST /api/contact + GET /api/contact"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          POST validates (EmailStr, name 1-120 chars, message 1-4000 chars), persists to MongoDB
          collection `contact_messages` with uuid id and ISO received_at, returns {id, received_at, ok}.
          GET returns latest 50, newest first. Test invalid email -> 422, valid payload -> 200.
      - working: true
        agent: "testing"
        comment: |
          ✅ PASSED: All contact endpoints working perfectly. Valid submission returns 200 with proper UUID and timestamp. 
          Invalid email/empty name/missing message all return 422 as expected. GET endpoint retrieves messages correctly 
          with newest first ordering. Limit parameter respected. Data persistence verified.

  - task: "News: GET /api/news, POST /api/news, DELETE /api/news/{id}"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          GET returns documents from `news` collection sorted by created_at desc; if collection is
          empty, returns 4 seeded fallback items (id prefixed `seed-`). POST creates and returns the
          item (201). DELETE removes by id, returns 404 if not found.
      - working: true
        agent: "testing"
        comment: |
          ✅ PASSED: All news endpoints working perfectly. GET returns seeded fallback items when empty (4 items with seed- prefix). 
          POST creates news with 201 status and real UUID. New items appear first in subsequent GET requests. 
          DELETE removes items correctly and returns 200. DELETE with non-existent ID returns 404 as expected. 
          CORS headers present with Access-Control-Allow-Origin: *.

  - task: "Research Experience CRUD: GET/POST/PATCH/DELETE /api/research"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          GET /api/research returns collection items sorted by (order asc, created_at asc); if
          collection is empty, returns 7 seeded fallback items (ids "seed-r1".."seed-r7") each with
          a `links` array of {label,url}. GET /api/research/{id} returns one item (works for both
          real and seeded ids; 404 otherwise). POST creates a new item (201) — payload validates
          title>=1 and summary>=1; tags and links default to []; assigns next `order`. PATCH
          partial-updates any subset of fields (especially `links` which is the headline use case)
          and bumps `updated_at`. DELETE removes by id, 404 when missing. Field `links` items must
          have `label` (1-40 chars) and `url` (1-600 chars) — invalid links should produce 422.
      - working: true
        agent: "testing"
        comment: |
          ✅ PASSED: All 13 Research CRUD test steps completed successfully! Comprehensive testing performed:
          1. GET /api/research empty collection → 7 seeded items with correct structure (seed-r1 has Paper link with acs.nanolett + Group link)
          2. GET /api/research/seed-r1 → HTTP 200 with correct seeded item
          3. GET /api/research/non-existent → HTTP 404
          4. POST /api/research → HTTP 201 with real UUID, order field, created_at, links preserved
          5. GET /api/research after POST → real items returned (no seeded fallback)
          6. PATCH /api/research/{id} → HTTP 200 with updated links and updated_at timestamp
          7. PATCH empty body → HTTP 400 "No fields provided to update"
          8. PATCH non-existent → HTTP 404
          9. POST invalid links (missing url) → HTTP 422 validation error
          10. POST long label (60 chars) → HTTP 422 "String should have at most 40 characters"
          11. DELETE /api/research/{id} → HTTP 200 with {"ok":true,"deleted":<id>}
          12. DELETE again → HTTP 404
          13. GET after DELETE → test item gone, seeded fallback reappeared
          All CRUD operations, validation, error handling, and data persistence working perfectly.


frontend:
  - task: "Contact form wired to backend"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/sections/Contact.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Replaced localStorage stub with axios POST to /api/contact + toast feedback."

  - task: "Hero news fetched from backend with mock fallback"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/sections/Hero.jsx"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "useEffect calls /api/news; falls back silently to mock news on error/empty."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: |
      Backend MVP is in. Three endpoint groups to verify: /api/health, /api/contact (POST+GET),
      /api/news (GET+POST+DELETE). Use the public REACT_APP_BACKEND_URL from frontend/.env as base.
      Validation matters: invalid email on /api/contact must return 422; empty news collection must
      return seeded fallback (4 items with id starting "seed-"); created news item must appear first
      in subsequent GET. After tests, please clean up created data where reasonable.
  - agent: "main"
    message: |
      New scope: please verify the /api/research CRUD endpoints. Coverage needed:
      (a) GET /api/research on empty collection → returns 7 seeded items (ids seed-r1..seed-r7),
          each item must contain a `links` array (some non-empty, some empty), `tags` array, and
          `order` integer.
      (b) GET /api/research/seed-r1 → returns the seeded item directly without 404.
      (c) POST /api/research with full payload (title, summary, role, advisor, institution,
          period, tags, links=[{label,url},{label,url}]) → 201, returns new item with uuid id,
          order=N, links preserved.
      (d) GET /api/research → newly created item now appears in the list (and seeded fallback
          should NO longer be returned because collection is non-empty).
      (e) PATCH /api/research/{new_id} with body {"links":[{"label":"Updated","url":"https://x"}]}
          → 200, returns item with updated links and an updated_at timestamp.
      (f) PATCH with empty body → 400.
      (g) PATCH /api/research/non-existent → 404.
      (h) DELETE /api/research/{new_id} → 200; subsequent GET no longer contains it.
      (i) DELETE /api/research/non-existent → 404.
      (j) POST with invalid `links` (e.g. missing url, label > 40 chars) → 422.
      Re-run the previously verified contact/news tests is not necessary unless you suspect
      regressions.
  - agent: "testing"
    message: |
      ✅ BACKEND TESTING COMPLETE: All 15 test cases PASSED! 
      
      Comprehensive testing performed on all FastAPI endpoints at https://academic-archive-3.preview.emergentagent.com/api:
      
      1. Health & Root endpoints: ✅ Working perfectly
      2. Contact endpoints (POST/GET): ✅ All validation, persistence, and retrieval working
      3. News endpoints (GET/POST/DELETE): ✅ CRUD operations, seeded fallback, ordering all working
      4. CORS headers: ✅ Properly configured
      
      All backend functionality is production-ready. No issues found. Backend APIs are fully functional.
  - agent: "testing"
    message: |
      ✅ RESEARCH CRUD TESTING COMPLETE: All 13 test steps PASSED perfectly!
      
      Executed comprehensive Research Experience CRUD endpoint testing following the exact test plan:
      
      🎯 Test Results Summary:
      • GET /api/research (empty) → ✅ Returns 7 seeded items with correct structure
      • GET /api/research/seed-r1 → ✅ Returns seeded item (HTTP 200, not 404)
      • GET /api/research/non-existent → ✅ Returns 404
      • POST /api/research → ✅ Creates item with HTTP 201, real UUID, proper structure
      • GET /api/research (after POST) → ✅ Returns real items, no seeded fallback
      • PATCH /api/research/{id} → ✅ Updates links, sets updated_at timestamp
      • PATCH empty body → ✅ Returns 400 "No fields provided to update"
      • PATCH non-existent → ✅ Returns 404
      • POST invalid links (missing url) → ✅ Returns 422 validation error
      • POST long label (>40 chars) → ✅ Returns 422 validation error
      • DELETE /api/research/{id} → ✅ Returns 200 with {"ok":true,"deleted":<id>}
      • DELETE again → ✅ Returns 404
      • GET after DELETE → ✅ Test item gone, seeded fallback reappears
      
      All Research CRUD endpoints are production-ready with perfect validation, error handling, and data persistence.
