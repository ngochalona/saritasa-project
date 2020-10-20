import axios from 'axios';
import loginModule from '../modules/User';

const state = {
  listings: [],
  errors:   [],
};

const actions = {
  async showAllListings({ commit }, paginated) {
    const data = await axios.get('/api/listings', {
      headers: {
        Authorization: `Bearer ${loginModule.state.token}`,
      },
      params: paginated,
    })
      .then(res => {
        const listings = res.data;

        commit('SET_LISTING', listings);

        return listings;
      })
      .catch(error => {
        commit('GET_ERROR', error.response.data.errors);
      });

    return data;
  },

  async updateApproveListing({ commit }, id) {
    await axios.post(`/api/listings/${id}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${loginModule.state.token}`,
      },
    })
      .then(res => {
        // const listings = res.data;

        console.log(res.data);
      })
      .catch(error => {
        commit('GET_ERROR', error.response.data.errors);
      });
  },
};

const mutations = {
  SET_LISTING(state, listings) {
    state.listings = listings;
  },
  GET_ERROR(state, errors) {
    state.errors.push(errors);
  },
};

const getters = {
  getListings: state => state.listings,
};

// eslint-disable-next-line import/prefer-default-export
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};