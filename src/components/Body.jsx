const Body = ({ players }) => {
    return (
        <tbody>
            {players.map(({ name, level, bonus, sum, sex }) => (
                <tr key={name}>
                    <td>{name}</td>
                    <td>{level}</td>
                    <td>{bonus}</td>
                    <td>{sum}</td>
                    <td>{sex}</td>
                </tr>
            ))}
        </tbody>
    );
};

export default Body;
