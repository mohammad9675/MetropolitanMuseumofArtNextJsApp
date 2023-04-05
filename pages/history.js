import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { searchHistoryAtom } from "../store";
import styles from "../styles/History.module.css";
import { removeFromHistory } from "../lib/userData";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  if (!searchHistory) return null;
  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  if (!parsedHistory.length)
    return (
      <Card>
        <Card.Body>
          <Card.Title>Nothing Here</Card.Title>
          <Card.Text>Try searching for some artwork</Card.Text>
        </Card.Body>
      </Card>
    );
  return (
    <ListGroup>
      {parsedHistory.map((item, index) => (
        <ListGroup.Item
          className={styles.historyListItem}
          onClick={(e) => historyClicked(e, index)}
          key={index}
        >
          {Object.keys(item).map((key) => (
            <>
              {key}: <strong>{item[key]}</strong>&nbsp;
            </>
          ))}
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
