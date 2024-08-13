
const EditRequestTableRow = ({editRequest}) => {
    const {_id, docId, editorEmail, vehicleName, imageUrl, type, dateOfExpiry, createdAt} = editRequest;
    const formattedDateOfExpiry = new Date(dateOfExpiry).toISOString().split('T')[0];
    const formattedCreatedAt = new Date(createdAt).toISOString().split('T')[0];
    return (
        <tr className="text-lg">
        <th>{formattedCreatedAt}</th>
        <td>{type}</td>
        <td>{vehicleName}</td>
        <td>{editorEmail}</td>
        <td>{formattedDateOfExpiry}</td>
      </tr>
    );
};

export default EditRequestTableRow;