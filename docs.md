# Technical Design Document

   - 2025/01/12
   - Author: Víctor Valenzuela
   - Reference: [Challenge](https://teamsubscript.notion.site/EXTERNAL-Backend-developer-interview-prompt-b75b1a7c96ff44519889e152feb116bd)

## Overview
This document outlines key technical decisions made for the application and their justifications.

---

## Key Decisions

### **1. Database Type: PostgreSQL**
#### **Justification:**
- **Reliability:** PostgreSQL is a highly reliable, ACID-compliant relational database system that ensures data integrity.
- **Advanced Features:** It supports advanced querying capabilities, including JSON fields for semi-structured data, robust indexing, and powerful constraints.
- **Community and Support:** PostgreSQL has a strong community and extensive documentation, reducing learning curves and troubleshooting time.

---

### **2. Relationship Modeling (1:N, N:M)**
#### **Justification:**

The database schema is designed to reflect the relationships between entities in a collaborative task management system. The schema ensures efficient data retrieval, normalization to handle associations.

#### **Tables and Relationships:**

1. **`organizations`**:
   - Represents an organization that manages projects and users.
   - **Columns**:
     - `id`: Primary key.
     - `name`: Name of the organization.

2. **`users`**:
   - Represents individual users who can belong to an organization and participate in projects and tasks.
   - **Columns**:
     - `id`: Primary key.
     - `name`: Name of the user.
     - `email`: Unique email for the user.
     - `password`: Encrypted password.
     - `organizationId`: Foreign key referencing `organizations.id` (1:N relationship).

3. **`projects`**:
   - Represents projects that belong to an organization and contain tasks.
   - **Columns**:
     - `id`: Primary key.
     - `name`: Name of the project.
     - `description`: Optional description of the project.
     - `organizationId`: Foreign key referencing `organizations.id` (1:N relationship).

4. **`tasks`**:
   - Represents individual tasks within a project.
   - **Columns**:
     - `id`: Primary key.
     - `name`: Name of the task.
     - `description`: Optional description of the task.
     - `projectId`: Foreign key referencing `projects.id` (1:N relationship).

5. **`comments`**:
   - Represents comments made by users on tasks.
   - **Columns**:
     - `id`: Primary key.
     - `content`: Text content of the comment.
     - `userId`: Foreign key referencing `users.id` (1:N relationship with users).
     - `taskId`: Foreign key referencing `tasks.id` (1:N relationship with tasks).

6. **`task_assignments`**:
   - Represents a many-to-many (N:M) relationship between `tasks` and `users`, indicating which users are assigned to specific tasks.
   - **Columns**:
     - `taskId`: Foreign key referencing `tasks.id`.
     - `userId`: Foreign key referencing `users.id`.
     - Composite primary key: `[taskId, userId]`.

7. **`project_assignments`**:
   - Represents a many-to-many (N:M) relationship between `projects` and `users`, indicating which users are assigned to specific projects.
   - **Columns**:
     - `projectId`: Foreign key referencing `projects.id`.
     - `userId`: Foreign key referencing `users.id`.
     - Composite primary key: `[projectId, userId]`.

#### **Advantages:**
- **1:N Relationships**:
  - Example: An organization manages multiple projects, and each project contains multiple tasks. This structure simplifies hierarchical data retrieval and ensures logical grouping.
- **N:M Relationships**:
  - Example: Users can be assigned to multiple projects and tasks, enabling collaborative features essential for the application.
- **Normalization**:
  - Avoids redundancy and ensures data consistency across the application.

---

### **3. Architecture Style: Monolithic**
#### **Justification:**
- **Simplified Development:**
  - A monolithic structure consolidates the codebase, reducing the complexity of managing distributed systems.
- **Faster Iterations:**
  - Ideal for an MVP, allowing rapid prototyping and deployment.
- **Cost-Effective:**
  - Easier to host and manage compared to microservices, making it more suitable for early-stage projects.
- **Future Flexibility:**
  - The codebase can be modularized over time, enabling a smooth transition to microservices if necessary.

---

### **4. API Type: REST**
#### **Justification:**
- **Standardized Communication:**
  - RESTful APIs leverage standard HTTP methods (GET, POST, PATCH, DELETE) and status codes, ensuring consistency.
- **Stateless:**
  - Each request contains all necessary information, improving scalability and simplifying the backend logic.
- **Ease of Use:**
  - REST is widely understood and supported by tools and frameworks, reducing the onboarding time for developers.
- **Flexibility:**
  - Suitable for integration with a variety of frontends and third-party tools.

---

### **5. Code Organization: Modular by Responsibility**
#### **Justification:**
- **Separation of Concerns:**
  - Organizing the code into modules based on responsibility (e.g., services, controllers, routes) improves readability and maintainability.
- **Reusability:**
  - Creating whenever possible functions that could be reuse across different controllers or routes.
- **Testability:**
  - Clear separation allows for independent unit testing of each layer.
- **Scalability:**
  - New features can be added without affecting unrelated parts of the system.

---

## Summary
These decisions aim to balance reliability, scalability, and simplicity while maintaining a clear path for future enhancements. 
Each choice is tailored to the application's requirements during the MVP phase, with flexibility for adaptation as the system evolves.

