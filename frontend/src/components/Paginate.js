import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Paginate = ({ list, pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className="justify-content-center">
        {[...Array(pages).keys()].map(x => (
          <LinkContainer key={x + 1} to={!isAdmin ? (keyword ? `/search/${keyword}/page/${x + 1}` : `/yarns/page/${x + 1}`) : `/admin/${list}/${x + 1}`}>
            <Pagination.Item className="success" active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
