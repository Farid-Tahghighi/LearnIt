import { Image } from "@chakra-ui/react";

interface Props {
  image: string;
  name: string;
}

const Profile = () => {
  return (
    <>
      <Image src="" boxSize={["15%", "20%", "30%"]} borderRadius={"full"} alt="" />
    </>
  );
};

export default Profile;
