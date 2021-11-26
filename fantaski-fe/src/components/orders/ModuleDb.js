import axios from "axios";
import { API_URL } from "../../config/url";
import moment from "moment";

export async function getMemberPoints(setMember, memberID) {
  let res = await axios.post(`${API_URL}/order/getMemberPoints`, {
    memberId: memberID,
  });
  setMember(res.data);
  // console.log("res", res.data);
}
