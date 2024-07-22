# NestJS Core

This is my core nestjs server application to be extended in other projects. It contains basic user authentication and authorization with abstract user and credential entities are used for magic link, sms,

## User Entities and Authentication

##### User

Is the entry point for authentication, authorization and pii.

##### Credential

Stores the type and value of a user's credential.

##### Pii

Stores the user's personal information.

##### LoginAttempt

Tracks login attempts to prevent brute force attacks.

##### VerificationToken

Used for email verification, password reset, magic link and sms verification.
