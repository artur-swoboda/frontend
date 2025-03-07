/**
 * DO NOT EDIT THIS FILE
 *
 * It is not used to to build anything.
 *
 * It's just a record of the old flow types.
 *
 * Use it as a guide when converting
 * - static/src/javascripts/bootstraps/enhanced/identity-common.js
 * to .ts, then delete it.
 */

// @flow

/**
 * Identity crap that has to run on every page (putting in usernames, avatars, etc.)
 *
 * Explicitly NOT stuff that only runs on the identity pages. Put that in profile.js or I will hunt you down. I WILL
 * HUNT YOU DOWN.
 */
import { catchErrorsWithContext } from 'lib/robust';
import { isUserLoggedIn } from 'common/modules/identity/api';

// Used to show elements that need signin. Use .sign-in-required
const setCssClass = (): void => {
    if (!isUserLoggedIn() || !document.documentElement) {
        return;
    }
    const classList = document.documentElement.classList;

    classList.add('id--signed-in');
    classList.remove('id--signed-out');
};

export const init = (): void => {
    catchErrorsWithContext([['i-css-class', setCssClass]]);
};
