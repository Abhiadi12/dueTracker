import React, { useState, useMemo } from "react";
import ContactCoulmn from "./ContactCoulmn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Button, Input } from "semantic-ui-react";
import ReactPaginate from "react-paginate";

const ContactGrid = () => {
  const userContacts = useSelector((state) => state.contact.contacts);
  const [filterValue, setFilterValue] = useState("");
  const [offset, setOffset] = useState(1);
  const [perPage] = useState(2);

  const handleFilter = (contact) => {
    return contact.attributes.name
      .toLowerCase()
      .startsWith(filterValue.toLocaleLowerCase());
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  let data = filterValue ? userContacts.filter(handleFilter) : userContacts;
  console.log("data ", data);

  const displayAllAssociatedContacts = () => {
    return data.map((contact) => (
      <ContactCoulmn
        key={contact.email}
        id={contact.id}
        attributes={contact.attributes}
      />
    ));
  };

  let pageCount = 0,
    indexOfFirstContact = 0,
    indexOfLastContact = 0;
  const totalPosts = data.length;
  console.log("totalPosts", totalPosts);
  if (totalPosts > 0) {
    pageCount = Math.ceil(totalPosts / perPage);
    indexOfLastContact = offset * perPage;
    indexOfFirstContact = indexOfLastContact - perPage;
    data = data.slice(indexOfFirstContact, indexOfLastContact);
  }
  console.log(indexOfFirstContact + " " + indexOfLastContact);
  console.log(filterValue);
  return (
    <>
      <Input
        size="mini"
        focus
        placeholder="search"
        onChange={(event) => {
          setOffset(1);
          setFilterValue(event.target.value);
        }}
      />
      <br />
      <br />
      {totalPosts > 0 ? (
        <>
          <Grid stackable columns={perPage + 1}>
            {displayAllAssociatedContacts()}
          </Grid>
        </>
      ) : (
        <Button as={Link} to="/addContact" positive>
          Add One{" "}
        </Button>
      )}
      {totalPosts == 0 ? null : (
        <ReactPaginate
          previousLabel={"prev"}
          initialPage={0}
          forcePage={offset - 1}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default ContactGrid;
