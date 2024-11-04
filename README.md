# Zoho Mini Dashboard

This simple app, uses zoho CRM APIs to set up a mini CRM tool where users can create, view, and update tickets and leads

## Benefits of This Project
Real-World Use: Mimics the workflow in CRM and support teams, giving you hands-on experience with Zoho’s ecosystem.
Expandable: Can easily be scaled to include more advanced features like automated ticket assignment or lead nurturing.
Multi-API Practice: Working with both Zoho CRM and Zoho Desk offers experience in managing and integrating multiple APIs.

## Setup
1. First, Clone this repository and navigate to the project directory.
2. Install dependencies:
```bash
 npm i 
 ``` 
3. Set up environment variables:
Create a .env.local file and add your Zoho OAuth token:
```bash
ZOHO_OAUTH_TOKEN=your_actual_zoho_oauth_token_here
USER_ID=your_actual_zoho_user_id_for_making_records_updates
ZOHO_OWNER_ID=your_actual_zoho_user_id_for_making_records_updates
ZOHO_CONTACT_ID=default_contact_id
ZOHO_RECORD_ID=default_record_id
ZOHO_RECORD_MODULE=default_module
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
