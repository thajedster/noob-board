import axios from "axios";

export default {
  login: function(body) {
    return axios.post("/login", body);
  },
  logout: function() {
    return axios.get("/logout");
  }
};
