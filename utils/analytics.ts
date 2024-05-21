import mixpanel from 'mixpanel-browser';

// to log events to mixpanel, use the following function
// in events you want to track

// const IN_TEST = process.env.NODE_ENV === 'test';

// export const logEvent = (
//     category: string | '' = '',
//     action = '',
//     trackingData = {},
//   ): void => {
//     if (IN_TEST) return;
//     if (category && action) {
//       mixpanel.track(action, trackingData);
//     }
//   };
