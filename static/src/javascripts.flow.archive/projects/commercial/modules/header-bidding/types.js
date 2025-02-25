/**
 * DO NOT EDIT THIS FILE
 *
 * It is not used to to build anything.
 *
 * It's just a record of the old flow types.
 *
 * Use it as a guide when converting
 * - static/src/javascripts/projects/commercial/modules/header-bidding/types.js
 * to .ts, then delete it.
 */

// @flow strict

export type HeaderBiddingSize = [number, number];

export type HeaderBiddingSlot = {
    key:
        | 'top-above-nav'
        | 'right'
        | 'inline1'
        | 'inline'
        | 'mostpop'
        | 'comments'
        | 'mobile-sticky'
        | 'banner',
    sizes: HeaderBiddingSize[],
};

export type PrebidOzoneParams = {
    publisherId: string,
    siteId: string,
    placementId: string,
    customData?: [{ [string]: mixed }],
    ozoneData?: { [string]: mixed },
};

export type PrebidSonobiParams = {
    ad_unit: string,
    dom_id: string,
    appNexusTargeting: string,
    pageViewId: string,
    render?: string,
};

export type PrebidPubmaticParams = {
    publisherId: string,
    adSlot: string,
};

export type PrebidIndexExchangeParams = {
    siteId: string,
    size: HeaderBiddingSize,
};

export type PrebidTrustXParams = {
    uid: string,
};

export type PrebidTripleLiftParams = {
    inventoryCode: string,
};

export type PrebidImproveParams = {
    placementId: number,
    size: {
        w?: number,
        h?: number,
    },
};

export type PrebidXaxisParams = {
    placementId: number,
};

export type PrebidAppNexusParams = {
    invCode?: string,
    member?: string,
    placementId?: string,
    keywords: {},
    lotame?: {},
};

export type PrebidOpenXParams = {
    delDomain: string,
    unit: string,
    customParams: {},
    lotame?: {},
};

export type PrebidAdYouLikeParams = {
    placement: string,
};

export type PrebidBidder = {
    name: string,
    switchName: string,
    bidParams: (
        slotId: string,
        sizes: HeaderBiddingSize[]
    ) =>
        | PrebidSonobiParams
        | PrebidIndexExchangeParams
        | PrebidTrustXParams
        | PrebidTripleLiftParams
        | PrebidImproveParams
        | PrebidXaxisParams
        | PrebidAppNexusParams
        | PrebidOpenXParams
        | PrebidOzoneParams
        | PrebidAdYouLikeParams
        | PrebidPubmaticParams,
};

export type PrebidBid = {
    bidder: string,
    params:
        | PrebidSonobiParams
        | PrebidIndexExchangeParams
        | PrebidTrustXParams
        | PrebidTripleLiftParams
        | PrebidImproveParams
        | PrebidXaxisParams
        | PrebidAppNexusParams
        | PrebidOpenXParams
        | PrebidOzoneParams
        | PrebidAdYouLikeParams
        | PrebidPubmaticParams,
};

export type PrebidMediaTypes = {
    banner: {
        sizes: HeaderBiddingSize[],
    },
};
