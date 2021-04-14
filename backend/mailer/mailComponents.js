const DOMAIN_NAME = String(process.env.DOMAIN_NAME)

export const itemRow = item => {
  return `<tr style="border: 1px solid #9AABBD">
  <td style="text-align: center">
    <div>
      <a target="_blank" rel="noreferrer" href="${DOMAIN_NAME}/products/${item.product}" style="text-decoration:none; color:#417d97; font-weight: bold">
        <img src="${process.env.GCLOUD_STORAGE_URL}/${process.env.GCLOUD_BUCKET}/minithumbs/${item.image}" alt=${item.art} width="80" height"80" />
      </a>
    </div>
  </td>
  <td style="text-align: center">
    <div>
      <a target="_blank" rel="noreferrer" href="${DOMAIN_NAME}/products/${item.product}" style="text-decoration:none; color:#417d97; font-weight: bold">
        ${item.art}
      </a>
    </div>
    <div>${item.brand}</div>
    <div>${item.name}</div>
    <div>${item.color.replace(/_+/g, " ")}</div>
  </td>
  <td style="text-align: center;">${item.fibers}</td>
  <td style="text-align: center;">${item.qty}</td>
  <td style="text-align: center;">${item.meterage}</td>
  <td style="text-align: center;">€${item.price.toFixed(2)}</td>
  <td style="text-align: center;">€${((item.qty * item.price) / 100).toFixed(2)}</td>
</tr>`
}

export const badges = {
  paid: "#3fb618",
  expired: "#81869c",
  canceled: "#a44a55",
  COMPLETED: "#3fb618"
}

export const storecredit = storecredit => {
  if (storecredit) {
    return `<tr>
        <td style="text-align: right; font-size: 12px; font-weight: 300;">store credit used: </td>
        <td style="font-size: 12px; font-weight: 300;"> -€${storecredit.toFixed(2)}</td>
      </tr>`
  } else {
    return ``
  }
}

export const infoBlock = order => {
  return `
  <hr style="border-top: 1px solid #e2e4e8;" />
  <div>
    <table style="width:100%; table-layout:fixed;">
      <tbody>
        <tr>
          <td style="width: 50%; max-width: 50%; min-width: 50%" valign="top">
            <div style="font-size: 18px; font-weight: 300;" align="left">PAYMENT DETAILS:</div>
            <div>
              <table>
                <tbody>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">placed: </td><td style="font-size: 12px; font-weight: 300;"> <nobr>${new Date(order.createdAt).toString().substring(0, 21)}</nobr></td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">paid: </td><td style="font-size: 12px; font-weight: 300;"> <nobr>${new Date(order.paidAt).toString().substring(0, 21)}</nobr></td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">payment ID: </td><td style="font-size: 12px; font-weight: 300;"> ${order.paymentResult.id}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">payment method: </td><td style="font-size: 12px; font-weight: 300;"> ${order.paymentMethod}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">payment status: </td><td style="font-size: 12px; font-weight: 300;"> 
                    <div style="background-color:${badges[order.paymentResult.status]}; padding: 2px 5px; color: white; text-transform:uppercase; display:inline-block">${order.paymentResult.status}</div>
                  </td></tr>
                </tbody>
              </table>
            </div>
          </td>
          <td style="width: 50%; max-width: 50%; min-width: 50%" valign="top">
            <div style="font-size: 18px; font-weight: 300;" align="left">SHIPPING DETAILS:</div>
            <div>
              <table>
                <tbody>
                <tr>
                  <td style="text-align: right; font-size: 12px; font-weight: 300;">email: </td>
                  <td style="font-size: 12px; font-weight: 300; text-decoration:none; color:#417d97">
                    <a href="mailto:" style="text-decoration:none; color:#417d97;">
                      ${order.user.email}
                    </a>
                  </td>
                </tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">phone: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.phone}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">name: </td><td style="font-size: 12px; font-weight: 300;"> ${order.user.name}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">address: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.address}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">city: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.city}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">zipcode: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.zipCode}</td></tr>
                  <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">country: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.country}</td></tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr style="border-top: 1px solid #e2e4e8;" />
`
}
