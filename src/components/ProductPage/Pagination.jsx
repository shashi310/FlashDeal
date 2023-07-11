import { Box, Button, Center } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ count, page, changePage }) => {
  let btns = new Array(count).fill(0);

  //   return (
  //     <Box>
  //       {btns.map((el, i) => {
  //         return <Button key={i}>{i + 1}</Button>;
  //       })}
  //     </Box>
  //   );

  return (
    <Box>
      {count > 0 ? (
        <Center>
          <Box>
            <Button
              mr={2}
              isDisabled={page == 1}
              onClick={() => changePage(-1)}
            >
              PREV
            </Button>
            <Button mr={2} isDisabled={true}>
              {page}
            </Button>
            <Button isDisabled={page == count} onClick={() => changePage(1)}>
              NEXT
            </Button>
          </Box>
        </Center>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Pagination;
