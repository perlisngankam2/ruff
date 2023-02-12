import { Button, Icon, ButtonProps, forwardRef } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

const Link = forwardRef(
  (
    { href, icon, children, locked, iconSize = 5, variant, bg,isExternal, ...rest },
    ref
  ) => {
    const router = useRouter();

    return (
      isExternal? <>
       <a href={String(href)} target="_blank" style={{display:"flex", cursor:"pointer",
       alignItems:"center", fontWeight:500 ,width:"full",borderRadius:"xl", gap:"2", marginLeft:"10"   }}  >
      <Button
       width="full"
       borderRadius="xl"
       variant={variant || 'link'}
       fontWeight={500}
        cursor={`${locked ? 'not-allowed' : 'pointer'}`}
        role="group"
        display="flex"
        gap={2}
        alignItems="center"
        disabled={locked}
        {...rest}
      bg={
        router.pathname === href && variant === 'link' ? 'primary.50' : bg
      }
      >  {icon ? <Icon as={icon} boxSize={iconSize} /> : ''}
        {children}
      </Button>
      </a> </> : 

      <NextLink href={href || ''}  passHref>
        <Button
          ref={ref}
          width="full"
          borderRadius="xl"
          variant={variant || 'link'}
          _focus={{ boxShadow: 'none' }}
          bg={
            router.pathname === href && variant === 'link' ? 'primary.50' : bg
          }
          fontWeight={500}
          cursor={`${locked ? 'not-allowed' : 'pointer'}`}
          role="group"
          display="flex"
          gap={2}
          alignItems="center"
          disabled={locked}
          {...rest}
        >
          {icon && <Icon as={icon} boxSize={iconSize} />}
          {children}
        </Button>
      </NextLink>
    );
  }
);

export default Link;
