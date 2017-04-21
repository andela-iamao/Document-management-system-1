import React, { Component } from 'react';

const UserDocs = (props) => {
  let documentList;
  if (props.document.document !== undefined) {
    documentList = props.document.document.data.map((document) => {
      console.log(document, "thisis one document.")
      return (
        <SingleDocument document={document} key={document.id} />
      )
    })
  }
  return (
    <div>
      <table className="bordered  responsive">
        <thead>
          <tr>
              <th>Title</th>
              <th>Access</th>
              <th>Content</th>
              <th>Published date</th>
          </tr>
        </thead>
        <tbody>
          { documentList }
        </tbody>
      </table>
    </div>
  )
}


const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td>{ document.title }</td>
      <td>{ document.access }</td>
      <td>{ document.content }</td>
      <td>{ (document.createdAt).slice(0, 10) }</td>
    </tr>
  );
}

export default UserDocs;