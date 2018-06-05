export default ({ url }) => {
  const id = url && url.query.id
  return (<div>{ id }</div>)
}
