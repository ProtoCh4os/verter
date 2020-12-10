type State = {
  loggedIn: boolean;
  user: {
    id: string;
    login: string;
    name: string;
    loggedAt: Date;
  } | null;
};

const defaultState: State = {
  loggedIn: false,
  user: null,
};

export const state = () => defaultState;

export const mutations = {
  login(st: State, user: State['user']) {
    st.loggedIn = true;
    st.user = user;
  },
  logout(st: State) {
    st.loggedIn = false;
    st.user = null;
  },
};
