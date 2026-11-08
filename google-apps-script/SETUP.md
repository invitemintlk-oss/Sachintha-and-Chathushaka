# Google Sheets setup (RSVP + Wishes)

Spreadsheet: https://docs.google.com/spreadsheets/d/1ZQmZb84YX_qjmk6xXVkG_BFg9bzTU10ddmsUyK-e4qE/edit

1. Open the spreadsheet > Extensions > Apps Script.
2. Delete the default code and paste the whole of `code.ts` (same as `google-apps-script/code.gs`).
3. (Optional) Select `setup` in the toolbar and click Run to create the "RSVP" and "Wishes" sheets now.
   Otherwise they are created automatically, with styled headers, on the first submission.
4. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Authorize.
5. Copy the Web App URL (ends in /exec) and either:
   - paste it into `GOOGLE_SCRIPT_URL` in `src/weddingConfig.ts`, or
   - set `VITE_GOOGLE_APPS_SCRIPT_URL=<url>` in `.env` locally / in Vercel Environment Variables.
6. After changing the script later: Deploy > Manage deployments > Edit > Version: New version.

Sheets created:
- RSVP:   Timestamp | Full Name | Phone | Attendance | Guests | Notes | Invited As
- Wishes: Timestamp | Name | Message | Invited As
