import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
`;

export const ListItem = styled.li`
    padding: 5px 0;
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ToggleContainer = styled.div`
    margin-top: 10px;
`;
