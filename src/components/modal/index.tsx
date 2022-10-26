import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "../../pages/dashboard";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  finishService: () => Promise<void>;
  data: ScheduleItem;
}

export function ModalInfo({
  isOpen,
  onOpen,
  onClose,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <Modal colorScheme={"orange"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        <ModalHeader color="white">Próximo</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex align="center" mb={3}>
            <FiUser size={28} color="#FFB13e" />
            <Text ml={3} fontSize="2xl" fontWeight="bold" color="white">
              {data?.customer}
            </Text>
          </Flex>
          <Flex align="center" mb={3}>
            <FiScissors size={28} color="#FFF" />
            <Text ml={3} fontSize="large" fontWeight="bold" color="white">
              {data?.haircut?.name}
            </Text>
          </Flex>
          <Flex align="center" mb={3}>
            <FaMoneyBillAlt size={28} color="#46ef75" />
            <Text ml={3} fontSize="large" fontWeight="bold" color="white">
              R$ {data?.haircut?.price}
            </Text>
          </Flex>

          <ModalFooter>
            <Button
              bg="button.cta"
              _hover={{ bg: "#FFb13e" }}
              color="#fff"
              mr={3}
              onClick={() => finishService()}
            >
              Finalizar serviço
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
