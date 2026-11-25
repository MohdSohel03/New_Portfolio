# Administrator-only dashboard

## Goal
Only users with the administrator role can view the `/admin` dashboard.

## Changes
- Add a safe Supabase check for the currently signed-in user, backed by the existing protected `user_roles` table and private role-check function.
- Update the admin route guard to wait for that check and deny access when the user is not an administrator or the check fails.
- Add a focused test proving a non-admin and a failed role check cannot enter the dashboard.

## Verification
- Apply the Supabase function change, run the targeted access tests, and inspect the preview route behavior where the available session permits.