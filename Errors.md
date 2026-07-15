### Errors encountered are shown below here, either related to build or lint or some other error:

errors:
 ○ Compiling / ...
 GET / 200 in 5.5s (next.js: 4.6s, proxy.ts: 341ms, application-code: 530ms)
 GET /dashboard 200 in 1695ms (next.js: 1453ms, proxy.ts: 17ms, application-code: 225ms)
Error: Unauthorized
    at requireAuth (lib\auth.ts:33:11)
    at async GET (app\api\dashboard\stats\route.ts:9:5)
  31 |
  32 |   if (!user) {
> 33 |     throw new Error("Unauthorized");
     |           ^
  34 |   }
  35 |
  36 |   return user;
 GET /api/dashboard/stats 500 in 3.5s (next.js: 2.7s, application-code: 773ms)
○ Compiling /api/loans ...
Error: Unauthorized
    at requireAuth (lib\auth.ts:33:11)
    at async GET (app\api\tools\route.ts:12:5)
  31 |
  32 |   if (!user) {
> 33 |     throw new Error("Unauthorized");
     |           ^
  34 |   }
  35 |
  36 |   return user;
 GET /api/tools 500 in 4.1s (next.js: 3.8s, application-code: 324ms)
Error: Unauthorized
    at requireAuth (lib\auth.ts:33:11)
    at async GET (app\api\loans\route.ts:18:18)
  31 |
  32 |   if (!user) {
> 33 |     throw new Error("Unauthorized");
     |           ^
  34 |   }
  35 |
  36 |   return user;
 GET /api/loans 500 in 4.3s (next.js: 3.9s, application-code: 356ms)
[browser] ⨯ unhandledRejection: Error: Failed to fetch tools.
    at getTools (services/toolService.ts:28:11)
    at async loadTools (file://C:/Users/91746/Desktop/DESKTOP/PRODESK/sideM15.1/craft/.next/dev/static/chunks/_1pw6rk8._.js:257:26)
  26 |
  27 |   if (!response.ok) {
> 28 |     throw new Error(
     |           ^
  29 |       result.message ??
  30 |       "Failed to fetch tools."
  31 |     );
[browser] ⨯ unhandledRejection: Error: Failed to load dashboard statistics.
    at handleResponse (services/dashboardService.ts:10:11)
    at async loadDashboard (file://C:/Users/91746/Desktop/DESKTOP/PRODESK/sideM15.1/craft/.next/dev/static/chunks/_1pw6rk8._.js:46:30)
   8 |
   9 |   if (!response.ok) {
> 10 |     throw new Error(
     |           ^
  11 |       result.message ??
  12 |         "Failed to load dashboard."
  13 |     );
[browser] ⨯ unhandledRejection: Error: Unauthorized
    at handleResponse (services/loanService.ts:9:11)
    at async loadLoans (file://C:/Users/91746/Desktop/DESKTOP/PRODESK/sideM15.1/craft/.next/dev/static/chunks/_1pw6rk8._.js:146:30)
   7 |
   8 |   if (!response.ok) {
>  9 |     throw new Error(
     |           ^
  10 |       data.message || "Something went wrong."
  11 |     );
  12 |   }
MongoDB Connected
MongoDB Connected
 GET /api/auth/me 401 in 4.9s (next.js: 2.8s, application-code: 2.1s)
 GET /api/auth/me 401 in 4.9s (next.js: 2.9s, application-code: 1963ms)