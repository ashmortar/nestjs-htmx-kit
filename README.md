# NestJS Core

This is my core nestjs server application to be extended in other projects.
It contains basic user authentication and authorization with abstract user
and credential entities are used for magic link, sms,

## User Entities and Authentication

### User

Is the entry point for authentication, authorization and pii.

#### Credential

Stores the type and value of a user's credential.

#### Pii

Stores the user's personal information.

#### LoginAttempt

Tracks login attempts to prevent brute force attacks.

#### VerificationToken

Used for email verification, password reset, magic link and sms verification.

#### Session

Stores the user's session information.

#### Role

Roles that can be assigned to users.

#### Permission

Permissions that can be assigned to roles.

#### RolePermission

Many to many relationship between roles and permissions.

#### UserRoles

Many to many relationship between users and roles.
