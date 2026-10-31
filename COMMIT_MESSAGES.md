# Suggested commit messages

These are suggested messages for real development commits, not a fabricated Git history. Make commits when the corresponding work actually lands.

## studiospace-client (20)

1. set up next app router and the studio color palette
2. add sticky navbar with a smaller screen menu
3. build the footer and wire up the newsletter feedback
4. add shared cards, dialogs and loading states
5. connect betterauth and build the register form
6. handle email login errors and google sign in
7. keep the requested page after login
8. fix reload redirect on private routes
9. build the three scene home slider
10. load six featured studios from the api
11. link category tiles to filtered explore results
12. add city search and price sorting to explore
13. show studio galleries, host details and reviews
14. calculate session totals in the booking dialog
15. show confirmed slots before sending a request
16. add the host listing form and image upload flow
17. reuse the studio form for owner updates
18. add delete and booking cancellation dialogs
19. remember the theme before the first paint
20. tidy up mobile spacing and document the deployment setup

## studiospace-server (12)

1. start the express api and mongodb connection
2. configure betterauth with the mongo adapter
3. validate the registration password on the server too
4. exchange verified sessions for httponly jwt cookies
5. add token checks and exact origin cors
6. add public studio search and featured queries
7. keep studio updates and deletes owner only
8. seed fourteen spaces and an examiner account
9. save pending bookings with server calculated prices
10. reject confirmed slot overlaps and invalid hours
11. restrict cancellation to the user's pending bookings
12. test the auth flow and document production cookie settings
