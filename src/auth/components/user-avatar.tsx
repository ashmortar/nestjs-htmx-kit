import { PiiType, SessionWithUserPii } from '@core/users/users.service';
export function UserAvatar({ user }: { user: SessionWithUserPii['user'] }) {
  const imgUrl = user.pii.find(
    (pii) => pii.type === PiiType.profile_photo_url,
  )?.value;

  const [nameToDisplay, initials] = getName(user);

  return (
    <div>
      {imgUrl ? (
        <img src={imgUrl} alt={nameToDisplay} />
      ) : (
        <div safe>{initials}</div>
      )}
      <div safe>{nameToDisplay}</div>
    </div>
  );
}

type NameToDisplay = string;
type Initials = string;
function getName(user: SessionWithUserPii['user']): [NameToDisplay, Initials] {
  const displayName = user.pii.find(
    (pii) => pii.type === PiiType.display_name,
  )?.value;

  const first = user.pii.find((pii) => pii.type === PiiType.first_name)?.value;
  const last = user.pii.find((pii) => pii.type === PiiType.last_name)?.value;
  const email = user.pii.find((pii) => pii.type === PiiType.email)?.value;
  const nameToDisplay =
    (displayName ?? (first && last))
      ? `${first} ${last}`
      : (email ?? 'Unknown');

  const initials =
    first && last ? `${first[0]}${last[0]}` : (email?.[0] ?? 'U');

  return [nameToDisplay, initials];
}
