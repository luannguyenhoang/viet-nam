'use client'

import { ReactNode } from 'react'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'

// import { AppStoreBadge } from '#/components/AppStoreBadge'
// import { PlayStoreBadge } from '#/components/PlayStoreBadge'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Công Ty</ListHeader>
            <Box as="a" href={'#'}>
              Về Chúng Tôi
            </Box>
            <Box as="a" href={'#'}>
              Blog
            </Box>
            <Box as="a" href={'#'}>
              Tuyển Dụng
            </Box>
            <Box as="a" href={'#'}>
              Liên Hệ
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Hỗ Trợ</ListHeader>
            <Box as="a" href={'#'}>
              Trung Tâm Trợ Giúp
            </Box>
            <Box as="a" href={'#'}>
              Trung Tâm An Toàn
            </Box>
            <Box as="a" href={'#'}>
              Quy Định Cộng Đồng
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Pháp Lý</ListHeader>
            <Box as="a" href={'#'}>
              Chính Sách Cookie
            </Box>
            <Box as="a" href={'#'}>
              Chính Sách Bảo Mật
            </Box>
            <Box as="a" href={'#'}>
              Điều Khoản Dịch Vụ
            </Box>
            <Box as="a" href={'#'}>
              Thực Thi Pháp Luật
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Tải Ứng Dụng</ListHeader>
            {/* <AppStoreBadge />
            <PlayStoreBadge /> */}
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© 2022 Dịch vụ du lịch Việt Nam</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}