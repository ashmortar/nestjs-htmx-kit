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

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  credentials: z.union([z.boolean(),z.lazy(() => CredentialFindManyArgsSchema)]).optional(),
  pii: z.union([z.boolean(),z.lazy(() => PiiFindManyArgsSchema)]).optional(),
  login_attempts: z.union([z.boolean(),z.lazy(() => LoginAttemptFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  verification_tokens: z.union([z.boolean(),z.lazy(() => VerificationTokenFindManyArgsSchema)]).optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  credentials: z.boolean().optional(),
  pii: z.boolean().optional(),
  login_attempts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  verification_tokens: z.boolean().optional(),
  user_roles: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  status: z.boolean().optional(),
  credentials: z.union([z.boolean(),z.lazy(() => CredentialFindManyArgsSchema)]).optional(),
  pii: z.union([z.boolean(),z.lazy(() => PiiFindManyArgsSchema)]).optional(),
  login_attempts: z.union([z.boolean(),z.lazy(() => LoginAttemptFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  verification_tokens: z.union([z.boolean(),z.lazy(() => VerificationTokenFindManyArgsSchema)]).optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CREDENTIAL
//------------------------------------------------------

export const CredentialIncludeSchema: z.ZodType<Prisma.CredentialInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CredentialArgsSchema: z.ZodType<Prisma.CredentialDefaultArgs> = z.object({
  select: z.lazy(() => CredentialSelectSchema).optional(),
  include: z.lazy(() => CredentialIncludeSchema).optional(),
}).strict();

export const CredentialSelectSchema: z.ZodType<Prisma.CredentialSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  type: z.boolean().optional(),
  external_id: z.boolean().optional(),
  value: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// PII
//------------------------------------------------------

export const PiiIncludeSchema: z.ZodType<Prisma.PiiInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PiiArgsSchema: z.ZodType<Prisma.PiiDefaultArgs> = z.object({
  select: z.lazy(() => PiiSelectSchema).optional(),
  include: z.lazy(() => PiiIncludeSchema).optional(),
}).strict();

export const PiiSelectSchema: z.ZodType<Prisma.PiiSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  type: z.boolean().optional(),
  value: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// LOGIN ATTEMPT
//------------------------------------------------------

export const LoginAttemptIncludeSchema: z.ZodType<Prisma.LoginAttemptInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const LoginAttemptArgsSchema: z.ZodType<Prisma.LoginAttemptDefaultArgs> = z.object({
  select: z.lazy(() => LoginAttemptSelectSchema).optional(),
  include: z.lazy(() => LoginAttemptIncludeSchema).optional(),
}).strict();

export const LoginAttemptSelectSchema: z.ZodType<Prisma.LoginAttemptSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  success: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenIncludeSchema: z.ZodType<Prisma.VerificationTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const VerificationTokenArgsSchema: z.ZodType<Prisma.VerificationTokenDefaultArgs> = z.object({
  select: z.lazy(() => VerificationTokenSelectSchema).optional(),
  include: z.lazy(() => VerificationTokenIncludeSchema).optional(),
}).strict();

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  token: z.boolean().optional(),
  type: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
  role_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoleArgsSchema: z.ZodType<Prisma.RoleDefaultArgs> = z.object({
  select: z.lazy(() => RoleSelectSchema).optional(),
  include: z.lazy(() => RoleIncludeSchema).optional(),
}).strict();

export const RoleCountOutputTypeArgsSchema: z.ZodType<Prisma.RoleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoleCountOutputTypeSelectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = z.object({
  role_permissions: z.boolean().optional(),
  user_roles: z.boolean().optional(),
}).strict();

export const RoleSelectSchema: z.ZodType<Prisma.RoleSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  role_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
  roles_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PermissionArgsSchema: z.ZodType<Prisma.PermissionDefaultArgs> = z.object({
  select: z.lazy(() => PermissionSelectSchema).optional(),
  include: z.lazy(() => PermissionIncludeSchema).optional(),
}).strict();

export const PermissionCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
}).strict();

export const PermissionSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE PERMISSIONS
//------------------------------------------------------

export const RolePermissionsIncludeSchema: z.ZodType<Prisma.RolePermissionsInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

export const RolePermissionsArgsSchema: z.ZodType<Prisma.RolePermissionsDefaultArgs> = z.object({
  select: z.lazy(() => RolePermissionsSelectSchema).optional(),
  include: z.lazy(() => RolePermissionsIncludeSchema).optional(),
}).strict();

export const RolePermissionsSelectSchema: z.ZodType<Prisma.RolePermissionsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  role_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

// USER ROLES
//------------------------------------------------------

export const UserRolesIncludeSchema: z.ZodType<Prisma.UserRolesInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

export const UserRolesArgsSchema: z.ZodType<Prisma.UserRolesDefaultArgs> = z.object({
  select: z.lazy(() => UserRolesSelectSchema).optional(),
  include: z.lazy(() => UserRolesIncludeSchema).optional(),
}).strict();

export const UserRolesSelectSchema: z.ZodType<Prisma.UserRolesSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentials: z.lazy(() => CredentialListRelationFilterSchema).optional(),
  pii: z.lazy(() => PiiListRelationFilterSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenListRelationFilterSchema).optional(),
  user_roles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  credentials: z.lazy(() => CredentialOrderByRelationAggregateInputSchema).optional(),
  pii: z.lazy(() => PiiOrderByRelationAggregateInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenOrderByRelationAggregateInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string().regex(/^(unverified|verified)$/) ]).optional(),
  credentials: z.lazy(() => CredentialListRelationFilterSchema).optional(),
  pii: z.lazy(() => PiiListRelationFilterSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenListRelationFilterSchema).optional(),
  user_roles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CredentialWhereInputSchema: z.ZodType<Prisma.CredentialWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialWhereInputSchema),z.lazy(() => CredentialWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialWhereInputSchema),z.lazy(() => CredentialWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  external_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CredentialOrderByWithRelationInputSchema: z.ZodType<Prisma.CredentialOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  external_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CredentialWhereUniqueInputSchema: z.ZodType<Prisma.CredentialWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    type_external_id: z.lazy(() => CredentialTypeExternal_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    type_external_id: z.lazy(() => CredentialTypeExternal_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  type_external_id: z.lazy(() => CredentialTypeExternal_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CredentialWhereInputSchema),z.lazy(() => CredentialWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialWhereInputSchema),z.lazy(() => CredentialWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  external_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const CredentialOrderByWithAggregationInputSchema: z.ZodType<Prisma.CredentialOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  external_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CredentialCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CredentialMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CredentialMinOrderByAggregateInputSchema).optional()
}).strict();

export const CredentialScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CredentialScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema),z.lazy(() => CredentialScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  external_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PiiWhereInputSchema: z.ZodType<Prisma.PiiWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PiiWhereInputSchema),z.lazy(() => PiiWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PiiWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PiiWhereInputSchema),z.lazy(() => PiiWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PiiOrderByWithRelationInputSchema: z.ZodType<Prisma.PiiOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PiiWhereUniqueInputSchema: z.ZodType<Prisma.PiiWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    type_user_id: z.lazy(() => PiiTypeUser_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    type_user_id: z.lazy(() => PiiTypeUser_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  type_user_id: z.lazy(() => PiiTypeUser_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PiiWhereInputSchema),z.lazy(() => PiiWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PiiWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PiiWhereInputSchema),z.lazy(() => PiiWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PiiOrderByWithAggregationInputSchema: z.ZodType<Prisma.PiiOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PiiCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PiiMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PiiMinOrderByAggregateInputSchema).optional()
}).strict();

export const PiiScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PiiScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PiiScalarWhereWithAggregatesInputSchema),z.lazy(() => PiiScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PiiScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PiiScalarWhereWithAggregatesInputSchema),z.lazy(() => PiiScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LoginAttemptWhereInputSchema: z.ZodType<Prisma.LoginAttemptWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LoginAttemptWhereInputSchema),z.lazy(() => LoginAttemptWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoginAttemptWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoginAttemptWhereInputSchema),z.lazy(() => LoginAttemptWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  success: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const LoginAttemptOrderByWithRelationInputSchema: z.ZodType<Prisma.LoginAttemptOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const LoginAttemptWhereUniqueInputSchema: z.ZodType<Prisma.LoginAttemptWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LoginAttemptWhereInputSchema),z.lazy(() => LoginAttemptWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoginAttemptWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoginAttemptWhereInputSchema),z.lazy(() => LoginAttemptWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  success: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const LoginAttemptOrderByWithAggregationInputSchema: z.ZodType<Prisma.LoginAttemptOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LoginAttemptCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LoginAttemptMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LoginAttemptMinOrderByAggregateInputSchema).optional()
}).strict();

export const LoginAttemptScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LoginAttemptScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LoginAttemptScalarWhereWithAggregatesInputSchema),z.lazy(() => LoginAttemptScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoginAttemptScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoginAttemptScalarWhereWithAggregatesInputSchema),z.lazy(() => LoginAttemptScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  success: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RoleWhereInputSchema: z.ZodType<Prisma.RoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role_permissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional(),
  user_roles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionsOrderByRelationAggregateInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role_permissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional(),
  user_roles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict());

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoleMinOrderByAggregateInputSchema).optional()
}).strict();

export const RoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PermissionWhereInputSchema: z.ZodType<Prisma.PermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roles_permissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  roles_permissions: z.lazy(() => RolePermissionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roles_permissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RolePermissionsWhereInputSchema: z.ZodType<Prisma.RolePermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict();

export const RolePermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.RolePermissionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional(),
  permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional()
}).strict();

export const RolePermissionsWhereUniqueInputSchema: z.ZodType<Prisma.RolePermissionsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict());

export const RolePermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolePermissionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolePermissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolePermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolePermissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const RolePermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolePermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  role_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserRolesWhereInputSchema: z.ZodType<Prisma.UserRolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict();

export const UserRolesOrderByWithRelationInputSchema: z.ZodType<Prisma.UserRolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional()
}).strict();

export const UserRolesWhereUniqueInputSchema: z.ZodType<Prisma.UserRolesWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict());

export const UserRolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserRolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserRolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserRolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserRolesMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserRolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserRolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema),z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema),z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CredentialCreateInputSchema: z.ZodType<Prisma.CredentialCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  external_id: z.string(),
  value: z.string(),
  expires_at: z.coerce.date(),
  refresh_token: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCredentialsInputSchema)
}).strict();

export const CredentialUncheckedCreateInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  type: z.string(),
  external_id: z.string(),
  value: z.string(),
  expires_at: z.coerce.date(),
  refresh_token: z.string().optional().nullable()
}).strict();

export const CredentialUpdateInputSchema: z.ZodType<Prisma.CredentialUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCredentialsNestedInputSchema).optional()
}).strict();

export const CredentialUncheckedUpdateInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CredentialCreateManyInputSchema: z.ZodType<Prisma.CredentialCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  type: z.string(),
  external_id: z.string(),
  value: z.string(),
  expires_at: z.coerce.date(),
  refresh_token: z.string().optional().nullable()
}).strict();

export const CredentialUpdateManyMutationInputSchema: z.ZodType<Prisma.CredentialUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CredentialUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PiiCreateInputSchema: z.ZodType<Prisma.PiiCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  value: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutPiiInputSchema)
}).strict();

export const PiiUncheckedCreateInputSchema: z.ZodType<Prisma.PiiUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  type: z.string(),
  value: z.string()
}).strict();

export const PiiUpdateInputSchema: z.ZodType<Prisma.PiiUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPiiNestedInputSchema).optional()
}).strict();

export const PiiUncheckedUpdateInputSchema: z.ZodType<Prisma.PiiUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PiiCreateManyInputSchema: z.ZodType<Prisma.PiiCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  type: z.string(),
  value: z.string()
}).strict();

export const PiiUpdateManyMutationInputSchema: z.ZodType<Prisma.PiiUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PiiUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PiiUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoginAttemptCreateInputSchema: z.ZodType<Prisma.LoginAttemptCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  success: z.boolean(),
  user: z.lazy(() => UserCreateNestedOneWithoutLogin_attemptsInputSchema)
}).strict();

export const LoginAttemptUncheckedCreateInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  success: z.boolean()
}).strict();

export const LoginAttemptUpdateInputSchema: z.ZodType<Prisma.LoginAttemptUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLogin_attemptsNestedInputSchema).optional()
}).strict();

export const LoginAttemptUncheckedUpdateInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoginAttemptCreateManyInputSchema: z.ZodType<Prisma.LoginAttemptCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  success: z.boolean()
}).strict();

export const LoginAttemptUpdateManyMutationInputSchema: z.ZodType<Prisma.LoginAttemptUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoginAttemptUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  token: z.string(),
  type: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutVerification_tokensInputSchema)
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  token: z.string(),
  type: z.string()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVerification_tokensNestedInputSchema).optional()
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string(),
  token: z.string(),
  type: z.string()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user_id: z.string()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  role_permissions: z.lazy(() => RolePermissionsCreateNestedManyWithoutRoleInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  role_permissions: z.lazy(() => RolePermissionsUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionsUpdateManyWithoutRoleNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleCreateManyInputSchema: z.ZodType<Prisma.RoleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  roles_permissions: z.lazy(() => RolePermissionsCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  roles_permissions: z.lazy(() => RolePermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roles_permissions: z.lazy(() => RolePermissionsUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roles_permissions: z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateInputSchema: z.ZodType<Prisma.RolePermissionsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutRole_permissionsInputSchema),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRoles_permissionsInputSchema)
}).strict();

export const RolePermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role_id: z.string(),
  permission_id: z.string()
}).strict();

export const RolePermissionsUpdateInputSchema: z.ZodType<Prisma.RolePermissionsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutRole_permissionsNestedInputSchema).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateManyInputSchema: z.ZodType<Prisma.RolePermissionsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role_id: z.string(),
  permission_id: z.string()
}).strict();

export const RolePermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesCreateInputSchema: z.ZodType<Prisma.UserRolesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_rolesInputSchema),
  role: z.lazy(() => RoleCreateNestedOneWithoutUser_rolesInputSchema)
}).strict();

export const UserRolesUncheckedCreateInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  role_id: z.string()
}).strict();

export const UserRolesUpdateInputSchema: z.ZodType<Prisma.UserRolesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional()
}).strict();

export const UserRolesUncheckedUpdateInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesCreateManyInputSchema: z.ZodType<Prisma.UserRolesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  role_id: z.string()
}).strict();

export const UserRolesUpdateManyMutationInputSchema: z.ZodType<Prisma.UserRolesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const CredentialListRelationFilterSchema: z.ZodType<Prisma.CredentialListRelationFilter> = z.object({
  every: z.lazy(() => CredentialWhereInputSchema).optional(),
  some: z.lazy(() => CredentialWhereInputSchema).optional(),
  none: z.lazy(() => CredentialWhereInputSchema).optional()
}).strict();

export const PiiListRelationFilterSchema: z.ZodType<Prisma.PiiListRelationFilter> = z.object({
  every: z.lazy(() => PiiWhereInputSchema).optional(),
  some: z.lazy(() => PiiWhereInputSchema).optional(),
  none: z.lazy(() => PiiWhereInputSchema).optional()
}).strict();

export const LoginAttemptListRelationFilterSchema: z.ZodType<Prisma.LoginAttemptListRelationFilter> = z.object({
  every: z.lazy(() => LoginAttemptWhereInputSchema).optional(),
  some: z.lazy(() => LoginAttemptWhereInputSchema).optional(),
  none: z.lazy(() => LoginAttemptWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const VerificationTokenListRelationFilterSchema: z.ZodType<Prisma.VerificationTokenListRelationFilter> = z.object({
  every: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
  some: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
  none: z.lazy(() => VerificationTokenWhereInputSchema).optional()
}).strict();

export const UserRolesListRelationFilterSchema: z.ZodType<Prisma.UserRolesListRelationFilter> = z.object({
  every: z.lazy(() => UserRolesWhereInputSchema).optional(),
  some: z.lazy(() => UserRolesWhereInputSchema).optional(),
  none: z.lazy(() => UserRolesWhereInputSchema).optional()
}).strict();

export const CredentialOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CredentialOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PiiOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PiiOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LoginAttemptOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LoginAttemptOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VerificationTokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserRolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const CredentialTypeExternal_idCompoundUniqueInputSchema: z.ZodType<Prisma.CredentialTypeExternal_idCompoundUniqueInput> = z.object({
  type: z.string(),
  external_id: z.string()
}).strict();

export const CredentialCountOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  external_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CredentialMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  external_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CredentialMinOrderByAggregateInputSchema: z.ZodType<Prisma.CredentialMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  external_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const PiiTypeUser_idCompoundUniqueInputSchema: z.ZodType<Prisma.PiiTypeUser_idCompoundUniqueInput> = z.object({
  type: z.string(),
  user_id: z.string()
}).strict();

export const PiiCountOrderByAggregateInputSchema: z.ZodType<Prisma.PiiCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PiiMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PiiMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PiiMinOrderByAggregateInputSchema: z.ZodType<Prisma.PiiMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const LoginAttemptCountOrderByAggregateInputSchema: z.ZodType<Prisma.LoginAttemptCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LoginAttemptMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LoginAttemptMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LoginAttemptMinOrderByAggregateInputSchema: z.ZodType<Prisma.LoginAttemptMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsListRelationFilterSchema: z.ZodType<Prisma.RolePermissionsListRelationFilter> = z.object({
  every: z.lazy(() => RolePermissionsWhereInputSchema).optional(),
  some: z.lazy(() => RolePermissionsWhereInputSchema).optional(),
  none: z.lazy(() => RolePermissionsWhereInputSchema).optional()
}).strict();

export const RolePermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RolePermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleRelationFilterSchema: z.ZodType<Prisma.RoleRelationFilter> = z.object({
  is: z.lazy(() => RoleWhereInputSchema).optional(),
  isNot: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const PermissionRelationFilterSchema: z.ZodType<Prisma.PermissionRelationFilter> = z.object({
  is: z.lazy(() => PermissionWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const RolePermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CredentialCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CredentialCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PiiCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PiiCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PiiCreateWithoutUserInputSchema),z.lazy(() => PiiCreateWithoutUserInputSchema).array(),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema),z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PiiCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LoginAttemptCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LoginAttemptCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateWithoutUserInputSchema).array(),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoginAttemptCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VerificationTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRolesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserRolesCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CredentialUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PiiUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PiiUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PiiCreateWithoutUserInputSchema),z.lazy(() => PiiCreateWithoutUserInputSchema).array(),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema),z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PiiCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LoginAttemptCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateWithoutUserInputSchema).array(),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoginAttemptCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const CredentialUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CredentialUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PiiUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PiiUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PiiCreateWithoutUserInputSchema),z.lazy(() => PiiCreateWithoutUserInputSchema).array(),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema),z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PiiUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PiiUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PiiCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PiiUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PiiUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PiiUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PiiUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PiiScalarWhereInputSchema),z.lazy(() => PiiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LoginAttemptUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LoginAttemptUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoginAttemptCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateWithoutUserInputSchema).array(),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LoginAttemptUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LoginAttemptUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoginAttemptCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LoginAttemptUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LoginAttemptUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LoginAttemptUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LoginAttemptUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LoginAttemptScalarWhereInputSchema),z.lazy(() => LoginAttemptScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VerificationTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema),z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CredentialUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialCreateWithoutUserInputSchema).array(),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema),z.lazy(() => CredentialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CredentialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CredentialWhereUniqueInputSchema),z.lazy(() => CredentialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CredentialUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CredentialUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PiiUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PiiUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PiiCreateWithoutUserInputSchema),z.lazy(() => PiiCreateWithoutUserInputSchema).array(),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema),z.lazy(() => PiiCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PiiUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PiiUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PiiCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PiiWhereUniqueInputSchema),z.lazy(() => PiiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PiiUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PiiUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PiiUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PiiUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PiiScalarWhereInputSchema),z.lazy(() => PiiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoginAttemptCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateWithoutUserInputSchema).array(),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema),z.lazy(() => LoginAttemptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LoginAttemptUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LoginAttemptUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoginAttemptCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LoginAttemptWhereUniqueInputSchema),z.lazy(() => LoginAttemptWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LoginAttemptUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LoginAttemptUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LoginAttemptUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LoginAttemptUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LoginAttemptScalarWhereInputSchema),z.lazy(() => LoginAttemptScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema),z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema),z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCredentialsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCredentialsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCredentialsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutCredentialsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCredentialsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCredentialsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCredentialsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCredentialsInputSchema),z.lazy(() => UserUpdateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPiiInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPiiInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPiiInputSchema),z.lazy(() => UserUncheckedCreateWithoutPiiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPiiInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPiiNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPiiNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPiiInputSchema),z.lazy(() => UserUncheckedCreateWithoutPiiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPiiInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPiiInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPiiInputSchema),z.lazy(() => UserUpdateWithoutPiiInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPiiInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLogin_attemptsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogin_attemptsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLogin_attemptsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutLogin_attemptsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLogin_attemptsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogin_attemptsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLogin_attemptsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLogin_attemptsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLogin_attemptsInputSchema),z.lazy(() => UserUpdateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLogin_attemptsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVerification_tokensInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVerification_tokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutVerification_tokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVerification_tokensNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVerification_tokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVerification_tokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVerification_tokensInputSchema),z.lazy(() => UserUpdateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVerification_tokensInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRolesCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRoleInputSchema),z.lazy(() => UserRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRoleInputSchema),z.lazy(() => UserRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRoleInputSchema),z.lazy(() => UserRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRoleInputSchema),z.lazy(() => UserRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleCreateNestedOneWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutRole_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutRole_permissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const PermissionCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const RoleUpdateOneRequiredWithoutRole_permissionsNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutRole_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutRole_permissionsInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutRole_permissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutRole_permissionsInputSchema),z.lazy(() => RoleUpdateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutRole_permissionsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUser_rolesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RoleCreateNestedOneWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutUser_rolesInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUser_rolesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUser_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUser_rolesInputSchema),z.lazy(() => UserUpdateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_rolesInputSchema) ]).optional(),
}).strict();

export const RoleUpdateOneRequiredWithoutUser_rolesNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutUser_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutUser_rolesInputSchema),z.lazy(() => RoleUpdateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUser_rolesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const CredentialCreateWithoutUserInputSchema: z.ZodType<Prisma.CredentialCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  external_id: z.string(),
  value: z.string(),
  expires_at: z.coerce.date(),
  refresh_token: z.string().optional().nullable()
}).strict();

export const CredentialUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  external_id: z.string(),
  value: z.string(),
  expires_at: z.coerce.date(),
  refresh_token: z.string().optional().nullable()
}).strict();

export const CredentialCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CredentialCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CredentialCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CredentialCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CredentialCreateManyUserInputSchema),z.lazy(() => CredentialCreateManyUserInputSchema).array() ]),
}).strict();

export const PiiCreateWithoutUserInputSchema: z.ZodType<Prisma.PiiCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  value: z.string()
}).strict();

export const PiiUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PiiUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  value: z.string()
}).strict();

export const PiiCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PiiCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PiiWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PiiCreateWithoutUserInputSchema),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PiiCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PiiCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PiiCreateManyUserInputSchema),z.lazy(() => PiiCreateManyUserInputSchema).array() ]),
}).strict();

export const LoginAttemptCreateWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  success: z.boolean()
}).strict();

export const LoginAttemptUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  success: z.boolean()
}).strict();

export const LoginAttemptCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LoginAttemptWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LoginAttemptCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LoginAttemptCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LoginAttemptCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LoginAttemptCreateManyUserInputSchema),z.lazy(() => LoginAttemptCreateManyUserInputSchema).array() ]),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
}).strict();

export const VerificationTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  token: z.string(),
  type: z.string()
}).strict();

export const VerificationTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  token: z.string(),
  type: z.string()
}).strict();

export const VerificationTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VerificationTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.VerificationTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VerificationTokenCreateManyUserInputSchema),z.lazy(() => VerificationTokenCreateManyUserInputSchema).array() ]),
}).strict();

export const UserRolesCreateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUser_rolesInputSchema)
}).strict();

export const UserRolesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role_id: z.string()
}).strict();

export const UserRolesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserRolesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserRolesCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserRolesCreateManyUserInputSchema),z.lazy(() => UserRolesCreateManyUserInputSchema).array() ]),
}).strict();

export const CredentialUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CredentialUpdateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CredentialCreateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CredentialUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CredentialUpdateWithoutUserInputSchema),z.lazy(() => CredentialUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CredentialUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CredentialScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CredentialUpdateManyMutationInputSchema),z.lazy(() => CredentialUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CredentialScalarWhereInputSchema: z.ZodType<Prisma.CredentialScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CredentialScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CredentialScalarWhereInputSchema),z.lazy(() => CredentialScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  external_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PiiUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PiiUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PiiWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PiiUpdateWithoutUserInputSchema),z.lazy(() => PiiUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PiiCreateWithoutUserInputSchema),z.lazy(() => PiiUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PiiUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PiiUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PiiWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PiiUpdateWithoutUserInputSchema),z.lazy(() => PiiUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PiiUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PiiUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PiiScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PiiUpdateManyMutationInputSchema),z.lazy(() => PiiUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PiiScalarWhereInputSchema: z.ZodType<Prisma.PiiScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PiiScalarWhereInputSchema),z.lazy(() => PiiScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PiiScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PiiScalarWhereInputSchema),z.lazy(() => PiiScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LoginAttemptUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LoginAttemptWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LoginAttemptUpdateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LoginAttemptCreateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LoginAttemptUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LoginAttemptWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LoginAttemptUpdateWithoutUserInputSchema),z.lazy(() => LoginAttemptUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LoginAttemptUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LoginAttemptScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LoginAttemptUpdateManyMutationInputSchema),z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LoginAttemptScalarWhereInputSchema: z.ZodType<Prisma.LoginAttemptScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LoginAttemptScalarWhereInputSchema),z.lazy(() => LoginAttemptScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoginAttemptScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoginAttemptScalarWhereInputSchema),z.lazy(() => LoginAttemptScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  success: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema),z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const VerificationTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => VerificationTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VerificationTokenUpdateManyMutationInputSchema),z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const VerificationTokenScalarWhereInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema),z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema),z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserRolesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserRolesUpdateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateManyMutationInputSchema),z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserRolesScalarWhereInputSchema: z.ZodType<Prisma.UserRolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserCreateWithoutCredentialsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  pii: z.lazy(() => PiiCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCredentialsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  pii: z.lazy(() => PiiUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCredentialsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCredentialsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCredentialsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCredentialsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCredentialsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCredentialsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCredentialsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pii: z.lazy(() => PiiUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCredentialsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCredentialsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pii: z.lazy(() => PiiUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPiiInputSchema: z.ZodType<Prisma.UserCreateWithoutPiiInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPiiInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPiiInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPiiInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPiiInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPiiInputSchema),z.lazy(() => UserUncheckedCreateWithoutPiiInputSchema) ]),
}).strict();

export const UserUpsertWithoutPiiInputSchema: z.ZodType<Prisma.UserUpsertWithoutPiiInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPiiInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPiiInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPiiInputSchema),z.lazy(() => UserUncheckedCreateWithoutPiiInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPiiInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPiiInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPiiInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPiiInputSchema) ]),
}).strict();

export const UserUpdateWithoutPiiInputSchema: z.ZodType<Prisma.UserUpdateWithoutPiiInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPiiInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPiiInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserCreateWithoutLogin_attemptsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLogin_attemptsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLogin_attemptsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogin_attemptsInputSchema) ]),
}).strict();

export const UserUpsertWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserUpsertWithoutLogin_attemptsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLogin_attemptsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogin_attemptsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLogin_attemptsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLogin_attemptsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLogin_attemptsInputSchema) ]),
}).strict();

export const UserUpdateWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLogin_attemptsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLogin_attemptsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLogin_attemptsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserCreateWithoutVerification_tokensInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVerification_tokensInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVerification_tokensInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]),
}).strict();

export const UserUpsertWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutVerification_tokensInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVerification_tokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVerification_tokensInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVerification_tokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVerification_tokensInputSchema) ]),
}).strict();

export const UserUpdateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutVerification_tokensInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVerification_tokensInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RolePermissionsCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsCreateWithoutRoleInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRoles_permissionsInputSchema)
}).strict();

export const RolePermissionsUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permission_id: z.string()
}).strict();

export const RolePermissionsCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionsCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionsCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionsCreateManyRoleInputSchema),z.lazy(() => RolePermissionsCreateManyRoleInputSchema).array() ]),
}).strict();

export const UserRolesCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesCreateWithoutRoleInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_rolesInputSchema)
}).strict();

export const UserRolesUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string()
}).strict();

export const UserRolesCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserRolesCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UserRolesCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserRolesCreateManyRoleInputSchema),z.lazy(() => UserRolesCreateManyRoleInputSchema).array() ]),
}).strict();

export const RolePermissionsUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionsUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateWithoutRoleInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionsUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateManyMutationInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionsScalarWhereInputSchema: z.ZodType<Prisma.RolePermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserRolesUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserRolesUpdateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserRolesUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateWithoutRoleInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UserRolesUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateManyMutationInputSchema),z.lazy(() => UserRolesUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionsCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateWithoutPermissionInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutRole_permissionsInputSchema)
}).strict();

export const RolePermissionsUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateWithoutPermissionInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role_id: z.string()
}).strict();

export const RolePermissionsCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionsCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionsCreateManyPermissionInputSchema),z.lazy(() => RolePermissionsCreateManyPermissionInputSchema).array() ]),
}).strict();

export const RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateManyMutationInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const RoleCreateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleCreateWithoutRole_permissionsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  user_roles: z.lazy(() => UserRolesCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutRole_permissionsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  user_roles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutRole_permissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]),
}).strict();

export const PermissionCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const PermissionUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string()
}).strict();

export const PermissionCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const RoleUpsertWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUpsertWithoutRole_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutRole_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutRole_permissionsInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutRole_permissionsInputSchema) ]),
}).strict();

export const RoleUpdateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUpdateWithoutRole_permissionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRolesUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutRole_permissionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const PermissionUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserCreateWithoutUser_rolesInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUser_rolesInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  status: z.string().regex(/^(unverified|verified)$/).optional(),
  credentials: z.lazy(() => CredentialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]),
}).strict();

export const RoleCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleCreateWithoutUser_rolesInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  role_permissions: z.lazy(() => RolePermissionsCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUser_rolesInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  role_permissions: z.lazy(() => RolePermissionsUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]),
}).strict();

export const UserUpsertWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUpsertWithoutUser_rolesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_rolesInputSchema) ]),
}).strict();

export const UserUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUpdateWithoutUser_rolesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUser_rolesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string().regex(/^(unverified|verified)$/),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentials: z.lazy(() => CredentialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pii: z.lazy(() => PiiUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  login_attempts: z.lazy(() => LoginAttemptUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RoleUpsertWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUpsertWithoutUser_rolesInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUser_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUser_rolesInputSchema) ]),
}).strict();

export const RoleUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUser_rolesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionsUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUser_rolesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const CredentialCreateManyUserInputSchema: z.ZodType<Prisma.CredentialCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  external_id: z.string(),
  value: z.string(),
  expires_at: z.coerce.date(),
  refresh_token: z.string().optional().nullable()
}).strict();

export const PiiCreateManyUserInputSchema: z.ZodType<Prisma.PiiCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  type: z.string(),
  value: z.string()
}).strict();

export const LoginAttemptCreateManyUserInputSchema: z.ZodType<Prisma.LoginAttemptCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  success: z.boolean()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const VerificationTokenCreateManyUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  token: z.string(),
  type: z.string()
}).strict();

export const UserRolesCreateManyUserInputSchema: z.ZodType<Prisma.UserRolesCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  role_id: z.string()
}).strict();

export const CredentialUpdateWithoutUserInputSchema: z.ZodType<Prisma.CredentialUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CredentialUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CredentialUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CredentialUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PiiUpdateWithoutUserInputSchema: z.ZodType<Prisma.PiiUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PiiUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PiiUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PiiUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PiiUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoginAttemptUpdateWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoginAttemptUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoginAttemptUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LoginAttemptUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional()
}).strict();

export const UserRolesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateManyRoleInputSchema: z.ZodType<Prisma.RolePermissionsCreateManyRoleInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permission_id: z.string()
}).strict();

export const UserRolesCreateManyRoleInputSchema: z.ZodType<Prisma.UserRolesCreateManyRoleInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string()
}).strict();

export const RolePermissionsUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionsUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional()
}).strict();

export const UserRolesUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateManyPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateManyPermissionInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role_id: z.string()
}).strict();

export const RolePermissionsUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithoutPermissionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutRole_permissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionsUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateWithoutPermissionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutPermissionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CredentialFindFirstArgsSchema: z.ZodType<Prisma.CredentialFindFirstArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CredentialScalarFieldEnumSchema,CredentialScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CredentialFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CredentialFindFirstOrThrowArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CredentialScalarFieldEnumSchema,CredentialScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CredentialFindManyArgsSchema: z.ZodType<Prisma.CredentialFindManyArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CredentialScalarFieldEnumSchema,CredentialScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CredentialAggregateArgsSchema: z.ZodType<Prisma.CredentialAggregateArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithRelationInputSchema.array(),CredentialOrderByWithRelationInputSchema ]).optional(),
  cursor: CredentialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CredentialGroupByArgsSchema: z.ZodType<Prisma.CredentialGroupByArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
  orderBy: z.union([ CredentialOrderByWithAggregationInputSchema.array(),CredentialOrderByWithAggregationInputSchema ]).optional(),
  by: CredentialScalarFieldEnumSchema.array(),
  having: CredentialScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CredentialFindUniqueArgsSchema: z.ZodType<Prisma.CredentialFindUniqueArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict() ;

export const CredentialFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CredentialFindUniqueOrThrowArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict() ;

export const PiiFindFirstArgsSchema: z.ZodType<Prisma.PiiFindFirstArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereInputSchema.optional(),
  orderBy: z.union([ PiiOrderByWithRelationInputSchema.array(),PiiOrderByWithRelationInputSchema ]).optional(),
  cursor: PiiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PiiScalarFieldEnumSchema,PiiScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PiiFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PiiFindFirstOrThrowArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereInputSchema.optional(),
  orderBy: z.union([ PiiOrderByWithRelationInputSchema.array(),PiiOrderByWithRelationInputSchema ]).optional(),
  cursor: PiiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PiiScalarFieldEnumSchema,PiiScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PiiFindManyArgsSchema: z.ZodType<Prisma.PiiFindManyArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereInputSchema.optional(),
  orderBy: z.union([ PiiOrderByWithRelationInputSchema.array(),PiiOrderByWithRelationInputSchema ]).optional(),
  cursor: PiiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PiiScalarFieldEnumSchema,PiiScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PiiAggregateArgsSchema: z.ZodType<Prisma.PiiAggregateArgs> = z.object({
  where: PiiWhereInputSchema.optional(),
  orderBy: z.union([ PiiOrderByWithRelationInputSchema.array(),PiiOrderByWithRelationInputSchema ]).optional(),
  cursor: PiiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PiiGroupByArgsSchema: z.ZodType<Prisma.PiiGroupByArgs> = z.object({
  where: PiiWhereInputSchema.optional(),
  orderBy: z.union([ PiiOrderByWithAggregationInputSchema.array(),PiiOrderByWithAggregationInputSchema ]).optional(),
  by: PiiScalarFieldEnumSchema.array(),
  having: PiiScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PiiFindUniqueArgsSchema: z.ZodType<Prisma.PiiFindUniqueArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereUniqueInputSchema,
}).strict() ;

export const PiiFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PiiFindUniqueOrThrowArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereUniqueInputSchema,
}).strict() ;

export const LoginAttemptFindFirstArgsSchema: z.ZodType<Prisma.LoginAttemptFindFirstArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereInputSchema.optional(),
  orderBy: z.union([ LoginAttemptOrderByWithRelationInputSchema.array(),LoginAttemptOrderByWithRelationInputSchema ]).optional(),
  cursor: LoginAttemptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LoginAttemptScalarFieldEnumSchema,LoginAttemptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LoginAttemptFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LoginAttemptFindFirstOrThrowArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereInputSchema.optional(),
  orderBy: z.union([ LoginAttemptOrderByWithRelationInputSchema.array(),LoginAttemptOrderByWithRelationInputSchema ]).optional(),
  cursor: LoginAttemptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LoginAttemptScalarFieldEnumSchema,LoginAttemptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LoginAttemptFindManyArgsSchema: z.ZodType<Prisma.LoginAttemptFindManyArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereInputSchema.optional(),
  orderBy: z.union([ LoginAttemptOrderByWithRelationInputSchema.array(),LoginAttemptOrderByWithRelationInputSchema ]).optional(),
  cursor: LoginAttemptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LoginAttemptScalarFieldEnumSchema,LoginAttemptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LoginAttemptAggregateArgsSchema: z.ZodType<Prisma.LoginAttemptAggregateArgs> = z.object({
  where: LoginAttemptWhereInputSchema.optional(),
  orderBy: z.union([ LoginAttemptOrderByWithRelationInputSchema.array(),LoginAttemptOrderByWithRelationInputSchema ]).optional(),
  cursor: LoginAttemptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LoginAttemptGroupByArgsSchema: z.ZodType<Prisma.LoginAttemptGroupByArgs> = z.object({
  where: LoginAttemptWhereInputSchema.optional(),
  orderBy: z.union([ LoginAttemptOrderByWithAggregationInputSchema.array(),LoginAttemptOrderByWithAggregationInputSchema ]).optional(),
  by: LoginAttemptScalarFieldEnumSchema.array(),
  having: LoginAttemptScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LoginAttemptFindUniqueArgsSchema: z.ZodType<Prisma.LoginAttemptFindUniqueArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereUniqueInputSchema,
}).strict() ;

export const LoginAttemptFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LoginAttemptFindUniqueOrThrowArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const RoleFindFirstArgsSchema: z.ZodType<Prisma.RoleFindFirstArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoleFindFirstOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleFindManyArgsSchema: z.ZodType<Prisma.RoleFindManyArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleAggregateArgsSchema: z.ZodType<Prisma.RoleAggregateArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoleGroupByArgsSchema: z.ZodType<Prisma.RoleGroupByArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithAggregationInputSchema.array(),RoleOrderByWithAggregationInputSchema ]).optional(),
  by: RoleScalarFieldEnumSchema.array(),
  having: RoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoleFindUniqueArgsSchema: z.ZodType<Prisma.RoleFindUniqueArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoleFindUniqueOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindFirstArgsSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindFirstOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindManyArgsSchema: z.ZodType<Prisma.PermissionFindManyArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionAggregateArgsSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionGroupByArgsSchema: z.ZodType<Prisma.PermissionGroupByArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithAggregationInputSchema.array(),PermissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: PermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionFindUniqueArgsSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsFindFirstArgsSchema: z.ZodType<Prisma.RolePermissionsFindFirstArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionsScalarFieldEnumSchema,RolePermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionsFindFirstOrThrowArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionsScalarFieldEnumSchema,RolePermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionsFindManyArgsSchema: z.ZodType<Prisma.RolePermissionsFindManyArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionsScalarFieldEnumSchema,RolePermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionsAggregateArgsSchema: z.ZodType<Prisma.RolePermissionsAggregateArgs> = z.object({
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionsGroupByArgsSchema: z.ZodType<Prisma.RolePermissionsGroupByArgs> = z.object({
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithAggregationInputSchema.array(),RolePermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: RolePermissionsScalarFieldEnumSchema.array(),
  having: RolePermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionsFindUniqueArgsSchema: z.ZodType<Prisma.RolePermissionsFindUniqueArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionsFindUniqueOrThrowArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const UserRolesFindFirstArgsSchema: z.ZodType<Prisma.UserRolesFindFirstArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRolesScalarFieldEnumSchema,UserRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserRolesFindFirstOrThrowArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRolesScalarFieldEnumSchema,UserRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRolesFindManyArgsSchema: z.ZodType<Prisma.UserRolesFindManyArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRolesScalarFieldEnumSchema,UserRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRolesAggregateArgsSchema: z.ZodType<Prisma.UserRolesAggregateArgs> = z.object({
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserRolesGroupByArgsSchema: z.ZodType<Prisma.UserRolesGroupByArgs> = z.object({
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithAggregationInputSchema.array(),UserRolesOrderByWithAggregationInputSchema ]).optional(),
  by: UserRolesScalarFieldEnumSchema.array(),
  having: UserRolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserRolesFindUniqueArgsSchema: z.ZodType<Prisma.UserRolesFindUniqueArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserRolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserRolesFindUniqueOrThrowArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const CredentialCreateArgsSchema: z.ZodType<Prisma.CredentialCreateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  data: z.union([ CredentialCreateInputSchema,CredentialUncheckedCreateInputSchema ]),
}).strict() ;

export const CredentialUpsertArgsSchema: z.ZodType<Prisma.CredentialUpsertArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
  create: z.union([ CredentialCreateInputSchema,CredentialUncheckedCreateInputSchema ]),
  update: z.union([ CredentialUpdateInputSchema,CredentialUncheckedUpdateInputSchema ]),
}).strict() ;

export const CredentialCreateManyArgsSchema: z.ZodType<Prisma.CredentialCreateManyArgs> = z.object({
  data: z.union([ CredentialCreateManyInputSchema,CredentialCreateManyInputSchema.array() ]),
}).strict() ;

export const CredentialCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CredentialCreateManyAndReturnArgs> = z.object({
  data: z.union([ CredentialCreateManyInputSchema,CredentialCreateManyInputSchema.array() ]),
}).strict() ;

export const CredentialDeleteArgsSchema: z.ZodType<Prisma.CredentialDeleteArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  where: CredentialWhereUniqueInputSchema,
}).strict() ;

export const CredentialUpdateArgsSchema: z.ZodType<Prisma.CredentialUpdateArgs> = z.object({
  select: CredentialSelectSchema.optional(),
  include: CredentialIncludeSchema.optional(),
  data: z.union([ CredentialUpdateInputSchema,CredentialUncheckedUpdateInputSchema ]),
  where: CredentialWhereUniqueInputSchema,
}).strict() ;

export const CredentialUpdateManyArgsSchema: z.ZodType<Prisma.CredentialUpdateManyArgs> = z.object({
  data: z.union([ CredentialUpdateManyMutationInputSchema,CredentialUncheckedUpdateManyInputSchema ]),
  where: CredentialWhereInputSchema.optional(),
}).strict() ;

export const CredentialDeleteManyArgsSchema: z.ZodType<Prisma.CredentialDeleteManyArgs> = z.object({
  where: CredentialWhereInputSchema.optional(),
}).strict() ;

export const PiiCreateArgsSchema: z.ZodType<Prisma.PiiCreateArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  data: z.union([ PiiCreateInputSchema,PiiUncheckedCreateInputSchema ]),
}).strict() ;

export const PiiUpsertArgsSchema: z.ZodType<Prisma.PiiUpsertArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereUniqueInputSchema,
  create: z.union([ PiiCreateInputSchema,PiiUncheckedCreateInputSchema ]),
  update: z.union([ PiiUpdateInputSchema,PiiUncheckedUpdateInputSchema ]),
}).strict() ;

export const PiiCreateManyArgsSchema: z.ZodType<Prisma.PiiCreateManyArgs> = z.object({
  data: z.union([ PiiCreateManyInputSchema,PiiCreateManyInputSchema.array() ]),
}).strict() ;

export const PiiCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PiiCreateManyAndReturnArgs> = z.object({
  data: z.union([ PiiCreateManyInputSchema,PiiCreateManyInputSchema.array() ]),
}).strict() ;

export const PiiDeleteArgsSchema: z.ZodType<Prisma.PiiDeleteArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  where: PiiWhereUniqueInputSchema,
}).strict() ;

export const PiiUpdateArgsSchema: z.ZodType<Prisma.PiiUpdateArgs> = z.object({
  select: PiiSelectSchema.optional(),
  include: PiiIncludeSchema.optional(),
  data: z.union([ PiiUpdateInputSchema,PiiUncheckedUpdateInputSchema ]),
  where: PiiWhereUniqueInputSchema,
}).strict() ;

export const PiiUpdateManyArgsSchema: z.ZodType<Prisma.PiiUpdateManyArgs> = z.object({
  data: z.union([ PiiUpdateManyMutationInputSchema,PiiUncheckedUpdateManyInputSchema ]),
  where: PiiWhereInputSchema.optional(),
}).strict() ;

export const PiiDeleteManyArgsSchema: z.ZodType<Prisma.PiiDeleteManyArgs> = z.object({
  where: PiiWhereInputSchema.optional(),
}).strict() ;

export const LoginAttemptCreateArgsSchema: z.ZodType<Prisma.LoginAttemptCreateArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  data: z.union([ LoginAttemptCreateInputSchema,LoginAttemptUncheckedCreateInputSchema ]),
}).strict() ;

export const LoginAttemptUpsertArgsSchema: z.ZodType<Prisma.LoginAttemptUpsertArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereUniqueInputSchema,
  create: z.union([ LoginAttemptCreateInputSchema,LoginAttemptUncheckedCreateInputSchema ]),
  update: z.union([ LoginAttemptUpdateInputSchema,LoginAttemptUncheckedUpdateInputSchema ]),
}).strict() ;

export const LoginAttemptCreateManyArgsSchema: z.ZodType<Prisma.LoginAttemptCreateManyArgs> = z.object({
  data: z.union([ LoginAttemptCreateManyInputSchema,LoginAttemptCreateManyInputSchema.array() ]),
}).strict() ;

export const LoginAttemptCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LoginAttemptCreateManyAndReturnArgs> = z.object({
  data: z.union([ LoginAttemptCreateManyInputSchema,LoginAttemptCreateManyInputSchema.array() ]),
}).strict() ;

export const LoginAttemptDeleteArgsSchema: z.ZodType<Prisma.LoginAttemptDeleteArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  where: LoginAttemptWhereUniqueInputSchema,
}).strict() ;

export const LoginAttemptUpdateArgsSchema: z.ZodType<Prisma.LoginAttemptUpdateArgs> = z.object({
  select: LoginAttemptSelectSchema.optional(),
  include: LoginAttemptIncludeSchema.optional(),
  data: z.union([ LoginAttemptUpdateInputSchema,LoginAttemptUncheckedUpdateInputSchema ]),
  where: LoginAttemptWhereUniqueInputSchema,
}).strict() ;

export const LoginAttemptUpdateManyArgsSchema: z.ZodType<Prisma.LoginAttemptUpdateManyArgs> = z.object({
  data: z.union([ LoginAttemptUpdateManyMutationInputSchema,LoginAttemptUncheckedUpdateManyInputSchema ]),
  where: LoginAttemptWhereInputSchema.optional(),
}).strict() ;

export const LoginAttemptDeleteManyArgsSchema: z.ZodType<Prisma.LoginAttemptDeleteManyArgs> = z.object({
  where: LoginAttemptWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const RoleCreateArgsSchema: z.ZodType<Prisma.RoleCreateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
}).strict() ;

export const RoleUpsertArgsSchema: z.ZodType<Prisma.RoleUpsertArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
  create: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
  update: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoleCreateManyArgsSchema: z.ZodType<Prisma.RoleCreateManyArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
}).strict() ;

export const RoleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RoleCreateManyAndReturnArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
}).strict() ;

export const RoleDeleteArgsSchema: z.ZodType<Prisma.RoleDeleteArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleUpdateArgsSchema: z.ZodType<Prisma.RoleUpdateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleUpdateManyArgsSchema: z.ZodType<Prisma.RoleUpdateManyArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
}).strict() ;

export const RoleDeleteManyArgsSchema: z.ZodType<Prisma.RoleDeleteManyArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
}).strict() ;

export const PermissionCreateArgsSchema: z.ZodType<Prisma.PermissionCreateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const PermissionUpsertArgsSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
  create: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
  update: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermissionCreateManyArgsSchema: z.ZodType<Prisma.PermissionCreateManyArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
}).strict() ;

export const PermissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PermissionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
}).strict() ;

export const PermissionDeleteArgsSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateArgsSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateManyArgsSchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
}).strict() ;

export const PermissionDeleteManyArgsSchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
}).strict() ;

export const RolePermissionsCreateArgsSchema: z.ZodType<Prisma.RolePermissionsCreateArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  data: z.union([ RolePermissionsCreateInputSchema,RolePermissionsUncheckedCreateInputSchema ]),
}).strict() ;

export const RolePermissionsUpsertArgsSchema: z.ZodType<Prisma.RolePermissionsUpsertArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
  create: z.union([ RolePermissionsCreateInputSchema,RolePermissionsUncheckedCreateInputSchema ]),
  update: z.union([ RolePermissionsUpdateInputSchema,RolePermissionsUncheckedUpdateInputSchema ]),
}).strict() ;

export const RolePermissionsCreateManyArgsSchema: z.ZodType<Prisma.RolePermissionsCreateManyArgs> = z.object({
  data: z.union([ RolePermissionsCreateManyInputSchema,RolePermissionsCreateManyInputSchema.array() ]),
}).strict() ;

export const RolePermissionsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RolePermissionsCreateManyAndReturnArgs> = z.object({
  data: z.union([ RolePermissionsCreateManyInputSchema,RolePermissionsCreateManyInputSchema.array() ]),
}).strict() ;

export const RolePermissionsDeleteArgsSchema: z.ZodType<Prisma.RolePermissionsDeleteArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsUpdateArgsSchema: z.ZodType<Prisma.RolePermissionsUpdateArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  data: z.union([ RolePermissionsUpdateInputSchema,RolePermissionsUncheckedUpdateInputSchema ]),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsUpdateManyArgsSchema: z.ZodType<Prisma.RolePermissionsUpdateManyArgs> = z.object({
  data: z.union([ RolePermissionsUpdateManyMutationInputSchema,RolePermissionsUncheckedUpdateManyInputSchema ]),
  where: RolePermissionsWhereInputSchema.optional(),
}).strict() ;

export const RolePermissionsDeleteManyArgsSchema: z.ZodType<Prisma.RolePermissionsDeleteManyArgs> = z.object({
  where: RolePermissionsWhereInputSchema.optional(),
}).strict() ;

export const UserRolesCreateArgsSchema: z.ZodType<Prisma.UserRolesCreateArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  data: z.union([ UserRolesCreateInputSchema,UserRolesUncheckedCreateInputSchema ]),
}).strict() ;

export const UserRolesUpsertArgsSchema: z.ZodType<Prisma.UserRolesUpsertArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
  create: z.union([ UserRolesCreateInputSchema,UserRolesUncheckedCreateInputSchema ]),
  update: z.union([ UserRolesUpdateInputSchema,UserRolesUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserRolesCreateManyArgsSchema: z.ZodType<Prisma.UserRolesCreateManyArgs> = z.object({
  data: z.union([ UserRolesCreateManyInputSchema,UserRolesCreateManyInputSchema.array() ]),
}).strict() ;

export const UserRolesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserRolesCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserRolesCreateManyInputSchema,UserRolesCreateManyInputSchema.array() ]),
}).strict() ;

export const UserRolesDeleteArgsSchema: z.ZodType<Prisma.UserRolesDeleteArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserRolesUpdateArgsSchema: z.ZodType<Prisma.UserRolesUpdateArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  data: z.union([ UserRolesUpdateInputSchema,UserRolesUncheckedUpdateInputSchema ]),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserRolesUpdateManyArgsSchema: z.ZodType<Prisma.UserRolesUpdateManyArgs> = z.object({
  data: z.union([ UserRolesUpdateManyMutationInputSchema,UserRolesUncheckedUpdateManyInputSchema ]),
  where: UserRolesWhereInputSchema.optional(),
}).strict() ;

export const UserRolesDeleteManyArgsSchema: z.ZodType<Prisma.UserRolesDeleteManyArgs> = z.object({
  where: UserRolesWhereInputSchema.optional(),
}).strict() ;