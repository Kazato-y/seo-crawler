import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const Info = styled.div`
    margin: 10px 0;
`;

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const ListItem = styled.li`
    padding: 5px 0;
`;

export const ChartContainer = styled.div`
    margin: 20px 0;
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;
