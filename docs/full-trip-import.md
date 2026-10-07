# Full trip Excel import

Open the import dialog, select **Trip**, and enter the trip details. Enter a title, summary and valid cover image URL; Telework and Worktrip are optional. The optional **Add your itinerary** section is below the trip details. Export Numbers to `.xlsx` first; `.numbers` and legacy `.xls` uploads are not supported.

Put each table on a separate sheet. Sheet names can be in any language; column headers identify the data kind. The sample uses `Dies`, `Nits`, `Despeses`, and `Spots`.

| Table    | Headers needed to identify it | Additional supported headers            |
| -------- | ----------------------------- | --------------------------------------- |
| Days     | date, kilometers              | —                                       |
| Nights   | date, city, sleptAt, free     | extraInfo, state                        |
| Expenses | date, category, valueEur      | subcategory, extraInfo, value, currency |
| Spots    | name, spotKind                | state, provinceName, shire              |

Days are required when attaching a workbook. Other tables are optional. Workbooks must be no larger than 20 MB. Excel dates and DD/MM/YYYY or YYYY-MM-DD text dates are accepted. Numeric cells retain their decimal values; amounts written as `1.234,56 €` are normalized. `free` accepts 0/1, booleans, or yes/no. Formula cells need saved calculated results. Extra columns and empty rows are ignored; a SUM kilometres footer without a date is excluded.

Choose **Select Excel file**. After parsing, the filename and chips show how many rows were found in each table. The × icon removes the workbook; to choose another file, remove it first. Select one country shared by all nights, expenses and spots on the trip details step. This version supports one table per data kind and one country per workbook. Without an Excel file, the same form creates a trip normally. With a file, **Review trip** shows the trip card with its summary inside, and centered tabs for the imported tables, followed by one **Create trip** action. The country selection is retained from the previous step; use **Back to trip details** to change it. Trip metadata and journals are not read from the workbook.

## Province names

Add `provinceName` to the Spots sheet. The `state` field remains the province code on each spot. For example, `CN-BJ` and `Beijing` create a province with `code = CN-BJ` and `name = Beijing`.

- New province codes require a name. If several spots share a code, one named row is sufficient; the province is created once.
- Existing codes can leave `provinceName` blank and reuse the stored name.
- Conflicting names for the same code, including conflicts with existing names, block import. Imports never rename existing provinces.
- Province names can be edited in the Spots review table.

Review each available tab. The existing expense controls allow editing categories, subcategories and descriptions. Correct other fields in the workbook, go back to trip details, remove the attached file and select the corrected workbook. Dates in nights and expenses must exist in the uploaded days; existing day dates are rejected to prevent reimports. The backend additionally validates country, trip, category and spot-kind references.

With Excel attached, the frontend sends the trip form, cover image URL and parsed tables to `POST /trips/create-with-data`. The backend validates all tables and province names, then creates the trip and saves days, nights, expenses and spots sequentially inside one database transaction. Failure rolls back the trip, provinces and all imported data. After successful creation, the dialog closes and opens the new trip’s journal at `/journals/{tripId}`. Without Excel, creation uses `POST /trips/create` and follows the same navigation. Do not blindly retry after an interrupted connection; check whether the trip was saved.

## Checks

- Frontend parser tests: `npm run test:import`.
- Backend ordering and rollback tests, from the backend project: `php vendor/bin/simple-phpunit tests`.
- Full frontend type check and build: `npm run build`.
- Production bundling only: `npx vite build` (does not perform TypeScript checks).
