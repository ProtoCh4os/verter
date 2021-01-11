import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { sdk } from '~/plugins/sdk';

type State = {
  loggedIn: boolean;
  user: {
    id: string;
    login: string;
    name: string;
    loggedAt: Date;
  } | null;
};

@Module({
  name: 'session',
  namespaced: true,
  stateFactory: true,
})
export default class extends VuexModule {
  public loggedIn = false;
  public user: State['user'] = null;

  @Mutation
  login(user: State['user']) {
    this.loggedIn = true;
    this.user = user;
  }

  @Mutation
  async logout() {
    this.loggedIn = false;
    this.user = null;
    await sdk.session.logout();
  }
}
