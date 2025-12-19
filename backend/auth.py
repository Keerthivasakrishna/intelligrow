from typing import Optional, Dict, Any
from fastapi import Header, HTTPException
from database import supabase
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_SERVICE_ROLE_KEY")


async def get_current_user(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    """
    Dependency to extract and validate the current user from JWT token.
    Returns user metadata including user_id, email, full_name, avatar_url.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    try:
        # Extract token from "Bearer <token>"
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        
        # Verify token using Supabase
        user_response = supabase.auth.get_user(token)
        
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        
        user = user_response.user
        
        return {
            "user_id": user.id,
            "email": user.email,
            "full_name": user.user_metadata.get("full_name", user.user_metadata.get("name", "")),
            "avatar_url": user.user_metadata.get("avatar_url", user.user_metadata.get("picture", ""))
        }
    
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
