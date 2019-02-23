export default (props, queryString) => {
  let info
  let plan = queryString.parse(props.location.search).plan
  if (plan === 'premiummob') {
    info = { id: 2, name: 'Premium Mob', price: '£25.00', slug: 'premiummob', stripePrice: 2500 }
  } else if (plan === 'premiumf2f') {
    info = { id: 3, name: 'Premium F2F', price: '£50.00', slug: 'premiumf2f', stripePrice: 5000 }
  } else {
    info = { id: 1, name: 'Premium', price: '£10.00', slug: 'premium', stripePrice: 1000 }
  }
  return info
}
