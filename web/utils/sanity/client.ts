const sanityClient = require('@sanity/client');
export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  //   token: 'sanity-auth-token', // or leave commented out to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});
