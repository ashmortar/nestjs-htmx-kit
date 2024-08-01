import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','status']);

export const CredentialScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','user_id','type','external_id','value','expires_at','refresh_token']);

export const PiiScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','user_id','type','value']);

export const LoginAttemptScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','user_id','success']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','user_id','token','type']);

export const SessionScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','user_id']);

export const RoleScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','name','description']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','name','description']);

export const RolePermissionsScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','role_id','permission_id']);

export const UserRolesScalarFieldEnumSchema = z.enum(['id','user_id','role_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  /**
   * Unique identifier for the user.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of user creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last user update.
   */
  updated_at: z.coerce.date(),
  /**
   * Current status of the user (e.g., 'verified', 'unverified').
   */
  status: z.string().regex(/^(unverified|verified)$/),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CREDENTIAL SCHEMA
/////////////////////////////////////////

export const CredentialSchema = z.object({
  /**
   * Unique identifier for the credential.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of credential creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last credential update.
   */
  updated_at: z.coerce.date(),
  /**
   * ID of the user this credential belongs to.
   */
  user_id: z.string(),
  /**
   * Type of credential (e.g., 'google', 'password').
   */
  type: z.string(),
  /**
   * Id from the external provider
   */
  external_id: z.string(),
  /**
   * Value of the credential (e.g., accessToken, password etc)
   */
  value: z.string(),
  /**
   * Expiration time of the stored value
   */
  expires_at: z.coerce.date(),
  /**
   * Value of refresh token if exists
   */
  refresh_token: z.string().nullable(),
})

export type Credential = z.infer<typeof CredentialSchema>

/////////////////////////////////////////
// PII SCHEMA
/////////////////////////////////////////

export const PiiSchema = z.object({
  /**
   * Unique identifier for the personally identifiable information (PII).
   */
  id: z.string().cuid(),
  /**
   * Timestamp of PII creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last PII update.
   */
  updated_at: z.coerce.date(),
  /**
   * ID of the user this PII belongs to.
   */
  user_id: z.string(),
  /**
   * Type of PII (e.g., 'full_name', 'date_of_birth').
   */
  type: z.string(),
  /**
   * Encrypted value of the PII.
   */
  value: z.string(),
})

export type Pii = z.infer<typeof PiiSchema>

/////////////////////////////////////////
// LOGIN ATTEMPT SCHEMA
/////////////////////////////////////////

export const LoginAttemptSchema = z.object({
  /**
   * Unique identifier for the login attempt.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of the login attempt.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last login attempt update.
   */
  updated_at: z.coerce.date(),
  /**
   * ID of the user who made the login attempt.
   */
  user_id: z.string(),
  /**
   * Indicates whether the login attempt was successful.
   */
  success: z.boolean(),
})

export type LoginAttempt = z.infer<typeof LoginAttemptSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  /**
   * Unique identifier for the verification token.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of token creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last token update.
   */
  updated_at: z.coerce.date(),
  /**
   * ID of the user this token belongs to.
   */
  user_id: z.string(),
  /**
   * Token value used for verification.
   */
  token: z.string(),
  /**
   * Type of verification (e.g., 'email', 'phone').
   */
  type: z.string(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  /**
   * Unique identifier for the session.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of session creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last session update.
   */
  updated_at: z.coerce.date(),
  /**
   * ID of the user this session belongs to.
   */
  user_id: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  /**
   * Unique identifier for the role.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of role creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last role update.
   */
  updated_at: z.coerce.date(),
  /**
   * Name of the role (e.g., 'admin', 'user').
   */
  name: z.string(),
  /**
   * Description of the role and its purpose.
   */
  description: z.string(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  /**
   * Unique identifier for the permission.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of permission creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last permission update.
   */
  updated_at: z.coerce.date(),
  /**
   * Name of the permission (e.g., 'create_post', 'edit_user').
   */
  name: z.string(),
  /**
   * Description of the permission.
   */
  description: z.string(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// ROLE PERMISSIONS SCHEMA
/////////////////////////////////////////

export const RolePermissionsSchema = z.object({
  /**
   * Unique identifier for the association between a role and a permission.
   */
  id: z.string().cuid(),
  /**
   * Timestamp of the association creation.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp of the last association update.
   */
  updated_at: z.coerce.date(),
  /**
   * The role ID in this association.
   */
  role_id: z.string(),
  /**
   * The permission ID in this association.
   */
  permission_id: z.string(),
})

export type RolePermissions = z.infer<typeof RolePermissionsSchema>

/////////////////////////////////////////
// USER ROLES SCHEMA
/////////////////////////////////////////

export const UserRolesSchema = z.object({
  /**
   * Unique identifier for the association between a user and a role.
   */
  id: z.string().cuid(),
  /**
   * The user ID in this association.
   */
  user_id: z.string(),
  /**
   * The role ID in this association.
   */
  role_id: z.string(),
})

export type UserRoles = z.infer<typeof UserRolesSchema>
