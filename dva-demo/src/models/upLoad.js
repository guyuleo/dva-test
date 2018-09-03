
export default {
  namespace: 'upLoad',
  state: { val: '123' },
  subscriptions: {},
  reducers: {
    test(state, action) {
      console.log('state, action in reducers test--------->', state, action)
      return { ...state, ...action };
    },
  },
};
