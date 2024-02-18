import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Button from "./Button";

interface Props {
  subject: string;
  teacher?: string;
  startTime: string;
  image: string;
  description: string;
  key: any;
}

const ClassCard = ({
  subject,
  teacher,
  startTime,
  image,
  description,
}: Props) => {
  return (
    <Card maxW="19%" m={"5"}>
      <CardBody p={0} pb={2}>
        <Image
          p={0}
          borderBottom={"1px"}
          borderColor={"gray"}
          src={image}
          alt="Green double couch with wooden legs"
          borderTopRadius={"lg"}
        />
        <Stack px={2}>
          <CardHeader pb={2} fontSize={"lg"} fontWeight={600}>
            <Text>{subject}</Text>
            <Text fontSize={"sm"}> by {teacher}</Text>
          </CardHeader>
          <Text>{description}</Text>
          <Text color="gray" fontSize="sm" fontWeight={50}>
            Starts at: {startTime}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter
        flex={1}
        flexDirection={"row"}
        justifyContent={"center"}
        pt={1}
      >
        <Button w="80%" bg="red.400">
          Enroll Now!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
