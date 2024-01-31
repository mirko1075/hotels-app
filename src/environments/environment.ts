// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    domain: 'dev-38qceg6kcjuno4ng.us.auth0.com',
    clientId: 'MHliV86XQiLmNyI9FFRgXpOfJcGOZgJN',
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  },
};
