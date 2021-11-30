import axios from "axios";
import { API_URL } from "../../config/url";
import moment from "moment";

export async function getMemberPoints(setMember) {
  let res = await axios.get(`${API_URL}/order/getMemberPoints`, {
    withCredentials: true,
  });
  setMember(res.data);
  // console.log("res", res.data);
}
