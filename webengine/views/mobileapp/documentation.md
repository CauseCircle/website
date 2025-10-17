# Mobile App API Documentation

This document provides information about the available API endpoints for the CauseCircle mobile application.

## Base URL
```
https://[domain]/mobileapp/
```

## Endpoints

### Causes
Retrieves a list of causes with optional filtering and pagination.

**Endpoint:** `/causes.json`

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 25)
- `featured` (optional): Filter by featured status (default: true)
- `search` (optional): Search term to filter causes by title

**Example Request:**
```
GET /mobileapp/causes.json?page=1&limit=10&featured=true&search=environment
```

**Response:**
```json
{
  "data": [
    {
      // Cause object
    }
  ],
  "meta": {
    "featured": true,
    "page": 1,
    "limit": 10
  }
}
```

---

### Followed Users
Retrieves a list of users that a specific user is following.

**Endpoint:** `/followed.json`

**Parameters:**
- `zuid` (required): User ID to get followed users for

**Example Request:**
```
GET /mobileapp/followed.json?zuid=123456
```

**Response:**
```json
{
  "data": [
    {
      // User object
    }
  ],
  "meta": {
    "zuid": "123456",
    "count": 5
  }
}
```

---

### Followers
Retrieves a list of users.

**Endpoint:** `/followers.json`

**Parameters:**
- `zuid` (optional): User ID to get information for

**Example Request:**
```
GET /mobileapp/followers.json?zuid=123456
```

**Response:**
```json
{
  "data": [
    {
      // User data
    }
  ],
  "meta": {
    "zuid": "123456",
    "count": 10
  }
}
```

---

### NPO Admins
Retrieves administrators of a specific non-profit organization.

**Endpoint:** `/npo_admins.json`

**Parameters:**
- `zuid` (required): Non-profit organization ID

**Example Request:**
```
GET /mobileapp/npo_admins.json?zuid=123456
```

**Response:**
```json
{
  "data": [
    {
      // Member object
    }
  ],
  "meta": {
    "zuid": "123456",
    "admins": "789,012,345"
  }
}
```

---

### NPO Followers
Retrieves users who follow a specific non-profit organization.

**Endpoint:** `/npo_followers.json`

**Parameters:**
- `zuid` (required): Non-profit organization ID

**Example Request:**
```
GET /mobileapp/npo_followers.json?zuid=123456
```

**Response:**
```json
{
  "data": [
    {
      // Member object
    }
  ]
}
```

---

### NPOs by Cause
Retrieves non-profit organizations filtered by a specific cause.

**Endpoint:** `/npos_by_cause.json`

**Parameters:**
- `cause` (required): Cause to filter NPOs by
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 25)
- `search` (optional): Search term to filter NPOs by name

**Example Request:**
```
GET /mobileapp/npos_by_cause.json?cause=environment&page=1&limit=10&search=wildlife
```

**Response:**
```json
{
  "data": [
    {
      // NPO object
    }
  ],
  "meta": {
    "page": 1,
    "cause": "environment",
    "start": 0,
    "limit": 10
  }
}
```

---

### NPOs
Retrieves non-profit organizations with various filtering options.

**Endpoint:** `/npos.json`

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 25)
- `exact_name` (optional): Filter NPOs by exact name
- `search` (optional): Search term to filter NPOs by name
- `followed` (optional): List of NPO IDs that are followed
- `featured` (optional): Filter by featured status
- `zuid` (optional): Specific NPO ID to retrieve
- `admin_zuid` (optional): Filter NPOs where the specified user is an admin

**Example Request:**
```
GET /mobileapp/npos.json?page=1&limit=10&featured=1
```

**Response:**
```json
{
  "data": [
    {
      // NPO object
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10
  }
}
```

---

### Stories by Cause
Retrieves stories filtered by a specific cause.

**Endpoint:** `/stories_by_cause.json`

**Parameters:**
- `cause` (required): Cause zuid to filter stories by
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 25)
- `search` (optional): Search term to filter stories by title

**Example Request:**
```
GET /mobileapp/stories_by_cause.json?cause=environment&page=1&limit=10&search=conservation
```

**Response:**
```json
{
  "data": [
    {
      // Story object
    }
  ],
  "meta": {
    "page": 1,
    "start": 0,
    "limit": 10
  }
}
```

---

### Stories
Retrieves stories with various filtering options.

**Endpoint:** `/stories.json`

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 25)
- `status` (optional): Filter by NPO approval status (default: "approved", can be set to "all")
- `npo` (optional): Filter stories by related NPO zuid
- `search` (optional): Search term to filter stories by title
- `author` (optional): Filter stories by author zuid
- `featured` (optional): Filter by featured status (used with author parameter)
- `created-at` (optional): Sort direction for creation date (default: "desc")

**Example Request:**
```
GET /mobileapp/stories.json?page=1&limit=10&author=123456&featured=1
```

**Response:**
```json
{
  "data": [
    {
      // Story object
    }
  ],
  "meta": {
    "page": 1,
    "start": 0,
    "limit": 10,
    "filter": "WHERE story.author = '123456' AND story.featured = '1' AND story.npo_approval_status = 'approved' SORT BY story.created_at desc"
  }
}
```

---

### Story
Retrieves a specific story by ID.

**Endpoint:** `/story.json`

**Parameters:**
- `zuid` (required): Story ID to retrieve

**Example Request:**
```
GET /mobileapp/story.json?zuid=123456
```

**Response:**
```json
{
  "data": [
    {
      // Story object
    }
  ],
  "meta": {
    "zuid": "123456"
  }
}
```

---

### User Profile
Retrieves a user's profile.

**Endpoint:** `/user_profile.json`

**Parameters:**
- `user_zuid` (required): User ID to retrieve profile for

**Example Request:**
```
GET /mobileapp/user_profile.json?user_zuid=123456
```

**Response:**
```json
{
  // User profile object
}
```
