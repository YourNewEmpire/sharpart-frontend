export default function isEmpty(obj) {
      return Object.values(obj).some(element => element !== null);
}