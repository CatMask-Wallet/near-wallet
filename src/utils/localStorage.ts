export const get_ptc_message_json = async () => {
    const ptc_message_json =
    // @ts-ignore
    (await chrome?.storage?.sync?.get('ptc_message_json'))?.ptc_message_json ??
    localStorage.ptc_message_json;
  console.log(ptc_message_json);
  return JSON.parse(ptc_message_json);
};
