# CloudSponge Contact Picker implemented with Remix

This small app is a simplification of how CloudSponge API would work in a Remix gitapplication.

[CloudSponge](https://www.cloudsponge.com/) is a convinient API for importing a user's contacts from their e-mail accounts. It works with Google, Yahoo, AOL,iCloud, Outlook, Office365, Yandex... the list goes on. This app demonstrates the integration with Google, Yahoo and Office 365.

Once the contacts are imported, it's up to the developer what they want to do with it. In this app we just render the name on the landing page. If the contact has no name, we render the email before the '@'.

Remix and other server side rendering frameworks (Next.js, etc ) pose a challenge when a developer tries to connect an API via a CDN from the 'head' element of index.html. CloudSponge is one of those API's. Furthermore, there might be situations when one needs to import multiple contacts in one component and a single contact in another. This app demonstrates how one can...

- add a script to the 'head' with the useEffect hook
- configure CloudSponge options
- control the behavior based on which component imports the contacts using React Context

Be advised that this app will run on localhost but you will have to use an API key to deploy it. CloudSponge has a 2 week trial period beyond which you'd have to pay a subscription fee to use it.

### Technologies used:

- Remix / React
- CloudSponge Api
- Prime React (UI Components)
- Typescript

Many thanks to the CloudSponge support team for helping with the challenges posed by this specific tech stack! I hope this helps someone in the future.

MIT License
